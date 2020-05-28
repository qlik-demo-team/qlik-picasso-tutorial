const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const config = {
  host: '', // <== Qlik server domain here
  secure: true,
  port: 443,
  prefix: '',
  appId: '', // <== app ID here
};
const url = SenseUtilities.buildUrl(config);

const qDocPromise = enigma.create({ schema, url }).open().then(global => global.openDoc(config.appId));

export default qDocPromise;