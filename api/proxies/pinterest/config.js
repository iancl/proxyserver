/**
 * The same pinterest token can be used to acess data from any pinterest
 *
 * @type {Object}
 */
module.exports = {
    host: 'https://api.pinterest.com',
    apps: {
        saymedia: {
            token: process.env.PINTEREST_TOKEN
        }
    },
    actions: {
        pins: {
            method: "GET",
            path: '/v1/me/pins/?access_token={{ACCESS-TOKEN}}&fields=id,creator,note,link,url,board,media,attribution,metadata'
        }
    }
};


