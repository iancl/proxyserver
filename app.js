const IS_DEV_ENV      = process.env.NODE_ENV === 'development';
const PORT            = IS_DEV_ENV ? 9090 : 80;
const Promise         = require('native-promise-only');
const express         = require('express');
const app             = express();
const config          = require('./config.js');
const logger          = require('./scripts/logger.js');
const proxy = require('./api/proxies/index.js');

// routes
app.get('/', (req, res) => {
    res.status(404);
});

// ==================== PROXIES ==================== //
app.get('/api/:server/:id/:action/', proxy);

// start server
app.listen(PORT, () => {
    logger.info('Listening on port: ' + PORT);
});
