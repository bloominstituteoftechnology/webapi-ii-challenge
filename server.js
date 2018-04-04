const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const postRouter = require('./posts/PostRouter');

const db = require('./data/db.js');

const server = express();

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/posts', postRouter);

server.get('/', function (req, res) {
  res.json({ api: 'Running...' });
});

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));