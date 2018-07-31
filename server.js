// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server= express();

// add your server code starting here
server.use(express.json());
server.use(helmet());
