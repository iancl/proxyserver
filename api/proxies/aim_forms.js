// modules
const Promise = require('native-promise-only');
// custom modules
const logger = require('../../scripts/logger.js');

function initEndpoint(req, res) {
    logger.info('aim foms proxy request');
    res.send('reached aim form proxy endpoint');
}

module.exports = initEndpoint;
