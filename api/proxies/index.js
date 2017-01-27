'use strict';
const fs             = require('fs');
const path           = require('path');
const requestPromise = require('request-promise');
const http           = require('http');
const logger         = require('../../scripts/logger.js');
const config         = require('./instagram/config.js');
const _ = require('highland');

let configuration = {};

/**
 * Import each social network configuration file dynamically
 */
// TODO: use streams or highland for this
fs.readdirSync(__dirname)
.filter(file => fs.statSync(path.join(__dirname, file)).isDirectory())
.forEach((name) => {
    configuration[name] = require(
        path.resolve(__dirname, name + '/config.js')
    );
});

function getRequestOptions(name, params, host, token, model) {
    let key;
    let uri = [host, model.path.replace('{{ACCESS-TOKEN}}', token)].join('');

    // this takes additional params and adds them to the uri
    for (key in params) {
        uri = uri.replace('{{' + key + '}}', params[key]);
    }

    return {
        uri: uri,
        method: model.method
    };
}

function initEndpoint(req, res) {
    let name = req.params.server;
    let serverConfig = configuration[req.params.server];
    let options;

    if (req.params.id in serverConfig.apps
            && req.params.action in serverConfig.actions) {
        logger.info('[' + name + ' proxy]: valid request with id: ' +
            req.params.id);

        options = getRequestOptions(
            name,
            req.query,
            serverConfig.host,
            serverConfig.apps[req.params.id].token,
            serverConfig.actions[req.params.action]
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
        logger.info('[' + name + ' proxy]: unknown id or action.');
        res.status(404).send('[' + name + ' proxy]: unknown id or action.');
    }
}

module.exports = initEndpoint;
