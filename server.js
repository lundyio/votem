// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const busboy = require('express-busboy');
const compression = require('compression');

// Get our API routes
const api = require('./routes.js');

const app = express();
app.use(compression())

// File upload config
busboy.extend(app, {
    upload: true,
    path: './tmp'
});

// Point static path to dist
app.use(express.static(path.join(__dirname, '/dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));