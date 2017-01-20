const ENV             = process.env.NODE_ENV || 'development';
const PORT            = 80;
const Promise         = require('native-promise-only');
const express         = require('express');
const app             = express();
const config          = require('./config.js');
const logger          = require('./scripts/logger.js');
const aim_forms_proxy = require('./api/proxies/aim_forms.js');
const instagram_proxy = require('./api/proxies/instagram.js');

// routes
app.get('/', (req, res) => {
    res.status(404);
});

// ==================== PROXIES ==================== //
// aim forms
app.get('/api/aim', aim_forms_proxy);
// instagram
app.get('/api/instagram/:id/:action', instagram_proxy);

// start server
app.listen(PORT, () => {
    logger.info('Listening on port: ' + PORT);
});
