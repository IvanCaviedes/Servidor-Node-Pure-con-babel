import {run} from './server/server'
import * as router from './routes/utilsroutes'
import {loadModules} from './routes/LoadModules'


export function configure(config) {
    this.config = config;
    this.run = run;
    this.router = router.configure(config);
    this.loadModules = loadModules;
    return this;
}
