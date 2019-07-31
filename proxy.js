const express = require('express');
const proxy = require('http-proxy-middleware');

const { routes } = require('./config.json');

const app = express();

for (route of routes) {
	console.log('route: %o',route);
    app.use(route.route,
        proxy({
            target: route.address,
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