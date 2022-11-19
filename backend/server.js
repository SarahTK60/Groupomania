// import http node package
const http = require('http');
// import the application define in app.js
const app = require('./app');
// dotenv loads environment variables from a .env file
require('dotenv').config();

// Returns a valid port, whether provided by the environment as a number or a string
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};


// Assign a valid port returned by normalizePort function if provided by the environment or the default port 5000
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);



// Check and handle errors
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
        default:
        throw error;
    }
};


// "app" will be called on each request
const server = http.createServer(app);

// Prepare the server
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Start the server
server.listen(port);