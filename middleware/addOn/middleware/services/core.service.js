const path = require('path');
const urlJoin = require("url-join");
const { CoreService } = require('@semapps/core');
const CONFIG = require('../config/config');
const containers = require('../config/containers');
const ApiGatewayService = require('moleculer-web');

console.log('jsonContextl',urlJoin(CONFIG.HOME_URL, 'context.json'));

module.exports = {
  mixins: [CoreService],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    baseDir: path.resolve(__dirname, '..'),
    jsonContext: urlJoin(CONFIG.HOME_URL,'public','context.json'),
    triplestore: {
      url: CONFIG.SPARQL_ENDPOINT,
      user: CONFIG.JENA_USER,
      password: CONFIG.JENA_PASSWORD,
      mainDataset: CONFIG.MAIN_DATASET,
    },
    containers,
    api: {
      port: CONFIG.PORT,
      routes: [
        {
          path: '/public/ontology',
          use: [
            ApiGatewayService.serveStatic('./public/ontology.ttl', {
              setHeaders: res => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', 'text/turtle; charset=utf-8');
              }
            })
          ]
        },
        {
           path: '/public/context.json',
           use: [
             ApiGatewayService.serveStatic('./public/context.json', {
               setHeaders: res => {
                 res.setHeader('Access-Control-Allow-Origin', '*');
                 res.setHeader('Content-Type', 'application/json; charset=utf-8');
               }
             })
           ]
       }
      ]
    },
    ldp: {
      preferredViewForResource: async (resourceUri, containerPreferredView) => {
        if (!containerPreferredView) return resourceUri;
        return urlJoin(CONFIG.FRONT_URL, containerPreferredView, encodeURIComponent(resourceUri), 'show')
      }
    },
    void: {
      title: CONFIG.INSTANCE_NAME,
      description: CONFIG.INSTANCE_DESCRIPTION
    },
    webacl: {
      superAdmins: []
    }
  }
};