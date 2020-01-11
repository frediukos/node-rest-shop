let http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; //work via the port 3000

const server = http.createServer(app);  //listener

server.listen(port); //start listener
