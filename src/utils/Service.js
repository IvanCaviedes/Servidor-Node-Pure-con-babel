
let services = {};

export function register(name, service) {
    services[name] = service;
}

export function get(name) {
    return services[name];
}
