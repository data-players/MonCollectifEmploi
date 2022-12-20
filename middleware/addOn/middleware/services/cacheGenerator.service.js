const CONFIG = require('../config/config');

module.exports = {
  name: 'cacheGenerator',
  events : {
    async 'ldp.resource.created'(ctx) {
      let { newData } = ctx.params;
      const { webId } = ctx.params;
      const users = await ctx.call('ldp.container.getUris', { containerUri: CONFIG.HOME_URL + 'persons' });
      for (var user of users) {
        console.log('RESOURCE CREATED',newData.id,user);
        const hasRights = await ctx.call('webacl.resource.hasRights', {
          resourceUri : newData.id,
          rights: { read: true },
          webId : user
        });
        console.log('hasRights',hasRights);
      }

    },
    async 'webid.created'(ctx) {
      console.log('USER CREATED  ctx.params',ctx.params);
      let { id } = ctx.params;
      await ctx.call('webacl.cache.generateForUser', {webId:id});
    }
  }
};
