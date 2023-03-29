
const CONFIG = require('../config/config');
const ontologies = require('../config/ontologies.json');
const {LdpService, DocumentTaggerMixin } = require('@semapps/ldp');
const { botsContainer } = require('@semapps/mirror');
const containers = require('../config/containers');
const urlJoin = require('url-join');

module.exports = {
  mixins: [LdpService, DocumentTaggerMixin],
  settings: {
    baseUrl:CONFIG.HOME_URL,
    ontologies: ontologies,
    containers: containers,
    preferredViewForResource: async (resourceUri, containerPreferredView) => {
      if (!containerPreferredView) return resourceUri;
      return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
    },
    defaultContainerOptions: {
      jsonContext: urlJoin('https://data.moncollectifemploi.fr/','context.json'),
    }
  },
  hooksContainer: {
        before: {
          "get":async (ctx)=>{

            const webId = ctx.params.webId || ctx.meta.webId || 'anon';

            if(!(webId.includes('system') || webId.includes('anon')) && (ctx.params.containerUri.includes('program') || ctx.params.containerUri.includes('organization'))) {
              const user =  await ctx.broker.call('ldp.resource.get', {
                resourceUri : webId,
                webId : webId,
                accept:'application/ld+json'
              });

              if (user['semapps:cacheReady']=='false'){
                throw new Error (`cet utilisateur a été créé recement créé et n'est pas encore opérationel, veillez réésayer dans quelques instants`)
              }
            }
          }
        }
      }
};
