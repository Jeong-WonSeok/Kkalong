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
    ),
    app.use(
        createProxyMiddleware('/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
            {
                target: "https://apis.data.go.kr",
                changeOrigin: true,
            }
        )
    )
}