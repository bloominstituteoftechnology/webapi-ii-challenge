const { server, posts } = require('./server.js');
// const DataManager = require('./datamanager.js');
//
// const dm = new DataManager();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-posts', { useMongoClient: true });
server.listen(3000);
