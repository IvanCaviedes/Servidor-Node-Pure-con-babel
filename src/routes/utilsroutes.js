import { _extend as extend } from 'util'

export function configure(config) {

    // Variables globales
    this.basePath = config.basePath || '';
    this.routes = [];

    // LLamando las funciones 
    this.addRoutes = addRoutes;
    this.match = match;

    return this;
}

function addRoutes(routes) {
    if (Array.isArray(routes)) {
        routes.map(route => {
            route._urlParams = route.url.match(/:[^\/]+/g) || [];
            route._urlRegex = new RegExp('^' + route.url
                .replace(/:[^\/]+/g, '(.*?)')
                .replace(/\//g, '\\/') + '$');
        });

        this.routes = this.routes.concat(routes);
    }
}

function match(req) {
    const i = req.url.pathname.indexOf(this.basePath);
    if (i !== 0) {
        return;
    }
    const path = req.url.pathname.substr(this.basePath.length);
    let params = {},
        matched = this.routes.find(route => {
            const method = route.method || 'GET';
            if (path === route.url && method === req.method) {
                return true;
            }

            let reMatch = path.match(route._urlRegex);

            if (reMatch && method === req.method) { // && method === ''
                params = route._urlParams.reduce((params, param, i) => {
                    params[param.substring(1)] = reMatch[i + 1];
                    return params;
                }, {});

                return true;
            }
        });

    if (matched) {
        matched = extend({}, matched);
        matched.params = params;
    }
    return matched;
}
