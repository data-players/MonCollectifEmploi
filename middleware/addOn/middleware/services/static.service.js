const { WebAclService } = require('@semapps/webacl');
const ApiGatewayService = require('moleculer-web');

module.exports = {
  name: 'staticFile',
  dependencies: ['api'],
  async started() {
    try {
        await this.broker.call('api.addRoute', {
          route:   {
            path: '/ontology',
            use: [
              ApiGatewayService.serveStatic('./public/ontology.ttl', {
                setHeaders: res => {
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.setHeader('Content-Type', 'text/turtle; charset=utf-8');
                }
              })
            ]
          }
        });
        await this.broker.call('api.addRoute', {
          route:   {
            path: '/context.json',
            use: [
              ApiGatewayService.serveStatic('./public/context.json', {
                setHeaders: res => {
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                }
              })
            ]
          }
        });
    } catch(e) {
        throw new MoleculerServerError("error in static route creation", e.message);
    }
  }
};
