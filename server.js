// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('development'));
app.use(express.json());

const db = require('./data/db.js');

// add your server code starting here

app.listen(3000);
