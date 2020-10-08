import { _extend as extend } from 'util';
import url from 'url';

export function handleRequest(req, res) {
    req.url = url.parse('http://' + req.headers.host + req.url, true);
    req.query = req.url.query;
    res.statusCode = this.config.defaults.response.statusCode;

    let matchedRoute = this.router.match(req);
    let headers = extend({
        'Content-Type': 'text/plain'
    }, this.config.defaults.response.headers);

    this.eventManager.emit('requestStart', req, res, matchedRoute);

    if (!req.terminate && typeof matchedRoute !== 'undefined') {

        headers = extend(headers, matchedRoute.headers || {});
        Object.keys(headers).map(name => res.setHeader(name, headers[name]));

        let module = this.serviceManager.get(matchedRoute.module);
        let action = matchedRoute.action + 'Action';

        req.params = matchedRoute.params;
        if (typeof module[action] === 'function') {
            module[action](req, res);
        }
    }

    res.end(res.body || 'buerna');
}