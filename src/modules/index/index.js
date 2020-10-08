import getRoutes from './index.route';

export { getRoutes };

export function factory(sm) {
    this.tokenAction = tokenAction;
    return this;
}
function tokenAction(req,res) {
    res.end('estas en la pagina principal de la api')
}