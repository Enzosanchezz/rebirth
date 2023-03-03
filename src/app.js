const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require("dotenv").config();

require('./db.js');

const server = express();

// server.name = 'API';
server.set(express.json());
server.set(cors());
server.set(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.set(bodyParser.json({ limit: '50mb' }));
server.set(cookieParser());
server.set(morgan('dev'));
server.set((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

export default app;
server.set('/', routes);

// Error catching endware.
server.set((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
