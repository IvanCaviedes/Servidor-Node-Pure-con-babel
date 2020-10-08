import http from 'http'

export function run() {
    const server = http.createServer((req, res) => {
        req.body = '';
    })
    server.listen(this.config.port, this.config.address, (err) => {
        if (err) {
            return console.error(error)
        }
        console.log('Server running at http://' + this.config.address + ':' + this.config.port);
    })
}