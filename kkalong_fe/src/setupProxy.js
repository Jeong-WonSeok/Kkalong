const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware('api/v1/',
            {
                target: 'http://k7b302.p.ssafy.io/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/v1/': '' // URL ^/api -> 공백 변경
                }
            }
        )
    )
    // app.use(
    //     createProxyMiddleware('kkalong-b4cec.appspot.com/o/',
    //         {
    //             target: 'https://firebasestorage.googleapis.com/v0/b/',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/kkalong-b4cec.appspot.com/o/': '' // URL ^/api -> 공백 변경
    //             }
    //         }
    //     )
    // )
}