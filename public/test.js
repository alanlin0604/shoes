const http = require('http');
const hostName = 'localhost';
const port = 3000;

const server = http.createServer((req,res) =>{
    res.statusCode = 200;
    res.setHeader = ('content-Type', 'text/html');
    res.end(`<h1>12345</h1>`);
});

server.listen(port, hostName, () => {
    console.log(`The server is listening on http://${hostName}:${port}.`);
});