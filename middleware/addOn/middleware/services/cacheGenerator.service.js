const CONFIG = require('../config/config');
const { quad, namedNode, blankNode, literal } = require('@rdfjs/data-model');

const cacheResourceRight = async (resourceUri, broker) => {
  const users = await broker.call('ldp.container.getUris', { containerUri: CONFIG.HOME_URL + 'persons' });

  for (var user of users) {
    // console.log('RESOURCE CREATED',newData.id,user);
    const hasRights = await broker.call('webacl.resource.hasRights', {
      resourceUri : resourceUri,
      rights: { read: true },
      webId : user
    });
    // console.log('hasRights',hasRights);
  }
  const hasRights = await broker.call('webacl.resource.hasRights', {
    resourceUri : resourceUri,
    rights: { read: true },
    webId : 'anon'
  });

  const resourceReadyCached =  await broker.call('ldp.resource.get', {
    resourceUri : resourceUri,
    webId : user
  });
};

module.exports = {
  name: 'cacheGenerator',
  events : {
    async 'ldp.resource.created'(ctx) {
      const { newData } = ctx.params;
      await cacheResourceRight(newData.id, this.broker)

    },
    async 'ldp.resource.updated'(ctx) {
      const { resourceUri } = ctx.params;
      await cacheResourceRight(resourceUri, this.broker)
    },
    async 'webid.created'(ctx) {

      const id = ctx.params['@id']||ctx.params['id'];

      await this.broker.call('ldp.resource.patch', {
        resourceUri : id,
        webId : 'system',
        triplesToAdd : [
          quad(
            namedNode(id),
            namedNode('http://semapps.org/ns/core#cacheReady'),
            literal('false')
          )
        ]
      });

      await this.broker.call('webacl.cache.generateForUser', {webId:id});

      await this.broker.call('ldp.resource.patch', {
        resourceUri : id,
        webId : 'system',
        triplesToRemove :[
          quad(
            namedNode(id),
            namedNode('http://semapps.org/ns/core#cacheReady'),
            literal('false')
          )
        ],
        triplesToAdd : [
          quad(
            namedNode(id),
            namedNode('http://semapps.org/ns/core#cacheReady'),
            literal('true')
          )
        ]
      });

    }
  }
};
