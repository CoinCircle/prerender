#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender();

server.use(prerender.basicAuth())
server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
if (process.env.REMOVE_SCRIPT_TAGS) {
    server.use(prerender.removeScriptTags());
}
server.use(prerender.replaceCachedAssetUrls());
server.use(prerender.httpHeaders()); 

server.start();
