import http from 'http'
import * as serviceManager from '../utils/Service';
import { handleRequest } from '../routes/Request'
import * as events from 'events';

export function run() {
    this.eventManager = new events.EventEmitter();
    this.serviceManager = serviceManager;
    this.serviceManager.register('appConfig', this.config);
    this.serviceManager.register('eventManager', this.eventManager);
    this.loadModules();

    const server = http.createServer((req, res) => {
        req.body = '';
        req
            .on('data', chunk => req.body += chunk)
            .on('end', () => handleRequest.call(this, req, res));
    })
    server.listen(this.config.port, this.config.address, (err) => {
        if (err) {
            return console.error(error)
        }
        console.log('Server running at http://' + this.config.address + ':' + this.config.port);
    })
}