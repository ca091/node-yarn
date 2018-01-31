const AnyProxy = require('anyproxy');
const rules = require('./rules');
const options = {
    port: 8001,
    rule: rules,
    webInterface: {
        enable: true,
        webPort: 8002,
        wsPort: 8003
    },
    throttle: 10000, //限速 kb/s
    // forceProxyHttps: true,
    silent: false
};
const proxyServer = new AnyProxy.ProxyServer(options);
proxyServer.on('ready', () => {
    console.log('proxyServer ready')
});
proxyServer.on('error', e => {
    console.log('proxyServer error', e)
});

// 配置127.0.0.1:8001为全局http代理服务器
// AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001');
// 关闭全局代理服务器
// AnyProxy.utils.systemProxyMgr.disableGlobalProxy();
proxyServer.start();