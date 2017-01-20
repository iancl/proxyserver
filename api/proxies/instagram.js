const HOST           ='https://api.instagram.com';
const requestPromise = require('request-promise');
const http           = require('http');
const logger         = require('../../scripts/logger.js');
const config         = require('./instagram/config.json');

function getRequestOptions(token, model) {
    return {
        uri: [HOST, model.path.replace('{{ACCESS-TOKEN}}', token)].join(''),
        method: model.method
    };
}

function initEndpoint(req, res) {
    var options;

    if (req.params.id in config.apps && req.params.action in config.actions) {
        logger.info('[instagram proxy]: valid request with id: ' +
            req.params.id);

        options = getRequestOptions(
            config.apps[req.params.id].token,
            config.actions[req.params.action]
        );

        requestPromise(options)
        .then((body) => {
            res.set('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).end(body);
        })
        .catch((err) => {
            logger.error(err);
            res.status(503).end('Error from data capture service');
        });
    }
    else {
        logger.info('[instagram proxy]: unknown id or action.');
        res.status(404).send('[instagram proxy]: unknown id or action.');
    }
}

module.exports = initEndpoint;
