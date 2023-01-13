const CONFIG = require('../config/config');
const { quad, namedNode, blankNode, literal } = require('@rdfjs/data-model');

const cacheResourceRight = async (resourceUri, broker) => {
  const users = await broker.call('ldp.container.getUris', { containerUri: CONFIG.HOME_URL + 'persons' });

  for (var user of users) {
    // console.log('______________________________cacheResourceRight hasright user',user);
    const hasRights = await broker.call('webacl.resource.hasRights', {
      resourceUri : resourceUri,
      rights: { read: true },
      webId : user
    });
  }
  // console.log('______________________________cacheResourceRight hasright anon');
  const hasRights = await broker.call('webacl.resource.hasRights', {
    resourceUri : resourceUri,
    rights: { read: true },
    webId : 'anon'
  });
  console.log('______________________________cacheResourceRight resource',resourceUri);
  const resourceReadyCached =  await broker.call('ldp.resource.get', {
    resourceUri : resourceUri,
    forceSemantic: true,
    accept:'application/ld+json',
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
      // console.log('______________________________ldp.resource.updated');
      // //need settimeout because cahe invalidation excution when ldp.resource.updated semapps ldp service
      // setTimeout(async ()=>{
      //   console.log('______________________________ldp.resource.updated timout');
      //   const { resourceUri } = ctx.params;
      //   await cacheResourceRight(resourceUri, this.broker)
      // }, 1000);


        console.log('______________________________ldp.resource.updated timout');
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
