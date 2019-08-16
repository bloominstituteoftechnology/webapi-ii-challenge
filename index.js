require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});