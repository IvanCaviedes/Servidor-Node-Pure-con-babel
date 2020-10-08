
export function loadModules() {
    let modules = Array.isArray(this.config.modules) ? this.config.modules : [];
    modules.map(name => {
        let module = require((this.config.modulesDir || '.') + '/' + name);
        if (typeof module.getRoutes === 'function') {
            this.router.addRoutes(module.getRoutes().map(route => {
                route.module = name;
                console.log(route)
                return route;
            }));
        }

        if (typeof module.factory === 'function') {
            module = module.factory(this.serviceManager);
        }

        this.serviceManager.register(name, module);
    });
}