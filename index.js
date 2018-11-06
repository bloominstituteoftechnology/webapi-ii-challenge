

//==============================================================================

//-- Dependencies --------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('./posts.js');

//-- Http Routing --------------------------------
const server = express();
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api/posts', posts);

//-- Configure server to accept requests ---------
server.listen(8081);
