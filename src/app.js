import {run} from './server/server'
export function configure(config) {
    this.config = config;
    this.run = run;
    return this;
}
