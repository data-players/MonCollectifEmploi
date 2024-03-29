import jsonld from 'jsonld';

import {
  LOAD_DATA,
  LOAD_FIELDS,
  LOAD_FAQ,
  LOAD_PAGE,
  addBooleanField,
  getFieldValues,
  getResourceValues,
} from '../actions';

import containers from '../config/containers.json';
import context from '../config/context.json';
import ontologies from '../config/ontologies.json';

import { getEmbedFrame } from './dereference';

import DataFactory from '@rdfjs/data-model';
const { literal, namedNode, quad, variable } = DataFactory;


// == Api Middleware
const middleware = (store) => (next) => (action) => {

  const state = store.getState();

  const fetchResourceContainer = (containerName) => {
    return fetchContainer(containerName, 'resource')
  }

  const fetchFieldContainer = (container) => {
    return fetchContainer(container, 'field')
  }

  const fetchContainer = async (containerName, type) => {
    // console.log('containerName',containerName)
    if (! containers[containerName]) {
      return;
    }
    const container = containers[containerName];

    let json;
    let compactJson; 
    if (container.mode!='LDP'){
      let sparqljsParams = {
        queryType: 'CONSTRUCT',
        template: [quad(variable('s1'), variable('p1'), variable('o1'))],
        where: [
          {
            type: 'filter',
            expression: {
              type: 'operation',
              operator: 'in',
              args: [variable('containerUri'), [namedNode(process.env.REACT_APP_MIDDLEWARE_URL + container.slug)]]
            }
          },
          {
            type: 'bgp',
            triples: [quad(variable('containerUri'), namedNode('http://www.w3.org/ns/ldp#contains'), variable('s1'))]
          },
          {
            type: 'filter',
            expression: {
              type: 'operation',
              operator: 'isiri',
              args: [variable('s1')]
            }
          },
          {
            type: 'bgp',
            triples: [quad(variable('s1'), variable('p1'), variable('o1'))]
          }
        ],
        type: 'query',
        prefixes: {}
      }

      if ( container.location === true ) {
        const locationTriples = [
          quad(variable('s1'), namedNode('http://virtual-assembly.org/ontologies/pair#hasLocation'), variable('sPairHasLocation')),
          quad(variable('sPairHasLocation '), variable('pPairHasLocation'), variable('oPairHasLocation ')),
          quad(variable('sPairHasLocation '), namedNode('http://virtual-assembly.org/ontologies/pair#hasPostalAddress'), variable('sPairHasPostalAddress ')),
          quad(variable('sPairHasPostalAddress '), variable('pPairHasPostalAddress'), variable('oPairHasPostalAddress '))
        ];
        sparqljsParams.template = sparqljsParams.template.concat(locationTriples);
        sparqljsParams.where = sparqljsParams.where.concat([{
          type: 'optional',
          patterns: [{
            type: 'bgp',
            triples: locationTriples
          }]
        }]);
      }

      ontologies.map(ontology => {
        return sparqljsParams.prefixes = {
          ...sparqljsParams.prefixes,
          [ontology.prefix]: ontology.url
        };
      });

      // Regenerate a SPARQL query from a JSON object
      let SparqlGenerator = require('sparqljs').Generator;
      let generator = new SparqlGenerator({});
      // console.log('sparqljsParams', container,sparqljsParams)
      const sparqljsQuery = generator.stringify(sparqljsParams);
      // console.log('sparqljsQuery',sparqljsQuery)
      const response  = await fetch(
        process.env.REACT_APP_MIDDLEWARE_URL + 'sparql', {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/ld+json',
            'accept': 'application/json'
          }),
          mode: 'cors',
          body: sparqljsQuery,
        }
      )
      if (!response.ok) {
        console.log('response.ko');
        throw new Error("HTTP error, status = " + response.status);
      }

      json = await response.json()

      let frame = {
        ...context,
        "@type": [container.resource],
        '@embed': '@never'
      };
      if ( container.location === true ) {
        frame = {
          ...frame,
          ...getEmbedFrame(['pair:hasLocation/pair:hasPostalAddress'])
        };
      }
  
      // console.log( 'frame',frame)
      compactJson = await jsonld.frame(json, frame, { omitGraph: false });
    }else{
      const response  = await fetch(`${process.env.REACT_APP_MIDDLEWARE_URL}${container.slug}`, {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/ld+json',
          'accept': 'application/json'
        }),
        mode: 'cors'
      });
      json = await response.json();
      compactJson = {
        '@context' : json['@context'],
        '@graph' : json['ldp:contains']
      }
    }

    const data = compactJson['@graph'];

    if (data.find(d => d.id === undefined)) {
      console.log('error: data not found', container);

    } else {
      const formatedData = data.map(d => ({
        ...d,
        label: d['pair:label']
      }))
      // console.log('middleware-LOAD_DATA FORMATED DATA', container, formatedData);
      
      if (type === 'resource') {
        store.dispatch(getResourceValues(container, formatedData));
      } else {
        store.dispatch(getFieldValues(container, formatedData));
      }
    }
  }

  switch (action.type) {

    case LOAD_DATA:
      if (!state.resourceValues[action.containerName]) {
        fetchResourceContainer(action.containerName)
      }
    break;

    case LOAD_FIELDS:
      const getFieldData = (data) => {
        data.forEach(field => {
          if (! state.fieldValues[field.name]) {
            switch (field.type) {
              case 'field-choice': getFieldData(field.fields); break;
              case 'boolean': store.dispatch(addBooleanField(field)); break;
              case 'standard': fetchFieldContainer(field.name); break;
              case 'chosen-field': fetchFieldContainer(field.name); break;
            }
          }
        })
      }
      getFieldData(state.resourceValues['configurations'][0].json.fields);
    break;

    case LOAD_FAQ:
      if (!state.resourceValues['faq']) {
        fetchResourceContainer('faq')
      }
    break;

    case LOAD_PAGE:
      if (!state.resourceValues['page']) {
        fetchResourceContainer('page')
      }
    break;

    default:
      next(action);
  }
};

// == Export
export default middleware;
