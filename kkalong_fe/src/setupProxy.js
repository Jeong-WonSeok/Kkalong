const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware(
            {
                target: 'http://k7b302.p.ssafy.io/api/v1',
                changeOrigin: true,
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