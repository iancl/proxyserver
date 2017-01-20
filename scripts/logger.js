'use strict';
const winston  = require ('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();
const env      = process.env.NODE_ENV || 'development';
const logDir   = '../log/';

// setting up logger instance
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: tsFormat,
            level: env === 'development' ? 'debug' : 'info'
        }),
        new (winston.transports.File)({
            filename: 'studioservern.log',
            timestamp: tsFormat,
            level: env === 'development' ? 'debug' : 'info'
        })
    ]
});

module.exports = logger;
