import http from 'http';
import app from './src/app';
import environmentVars from '@global/environmentVars';

const { PORT, NODE_ENV }: typeof environmentVars = environmentVars;

// Normalize a port into a number, string, or false.
function normalizePort(val: any) {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

// Get port from environment and store in Express.
const port = normalizePort(PORT || '8000');
app.set('port', port);

// Create the HTTP server
const server = http.createServer(app);

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`); // eslint-disable-line no-console
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`Listening on ${bind} in ${NODE_ENV}`); // eslint-disable-line no-console
}

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
