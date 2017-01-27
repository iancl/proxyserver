module.exports = {
    host: 'https://graph.facebook.com',
    apps: {
        saymedia: {
            token: process.env.FACEBOOK_TOKEN
        }
    },
    actions: {
        feed: {
            method: "GET",
            path: '/v2.8/{{pageId}}/feed/?access_token={{ACCESS-TOKEN}}'
        },
        post: {
            method: "GET",
            path: '/v2.8/{{postId}}/?fields=picture, message, caption, link, name, shares&access_token={{ACCESS-TOKEN}}'
        }
    }
};
