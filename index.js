const server = require('./server.js');

server.listen(3300, () => {
  console.log('\n*** Server Running on http://localhost:3300 ***\n');
});