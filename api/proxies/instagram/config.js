/**
 * Contains the access tokens of all instagram apps and also contains all the
 * actions(endpoints) that can be hit to retrieve information.
 * Each instagram app requires generating a different access token
 */
module.exports = {
    host: 'https://api.instagram.com',
    apps: {
        saymedia: {
            token: process.env.INSTAGRAM_TOKEN
        }
    },
    actions: {
        recent: {
            method: 'GET',
            path: '/v1/users/self/media/recent/?access_token={{ACCESS-TOKEN}}'
        }
    }
};
