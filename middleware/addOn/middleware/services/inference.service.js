const { InferenceService } = require('@semapps/inference');
const { defaultOntologies } = require('@semapps/core');
const CONFIG = require('../config/config');
const ontologies = require('../config/ontologies.json');

module.exports = {
  mixins: [InferenceService],
  dependencies: ['static'],
  settings: {
    baseUrl: CONFIG.HOME_URL,
    ontologies: ontologies
  }
};
