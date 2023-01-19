const express = require('express');
const { createProxyMiddleware} = require('http-proxy-middleware');

const { routes } = require('./config.json');

const app = express();

for (route of routes) {
	console.log('route: %o',route);
    app.use(route.route,
        createProxyMiddleware({
            target: route.address,
            changeOrigin: true,//Use this if you plan to use another host while redirecting
            pathRewrite: (path, req) => {
                console.log('path: '+path);
                                                
                return path;//.split('/').slice(2).join('/');//can use if needed
            }
        })
    );
}

app.listen(80, () => {
    console.log('Proxy listening on port 80');
});
