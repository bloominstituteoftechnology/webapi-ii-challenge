const server = require('./server');

server.listen(5050, () => {
  console.log('\n*** Server Running on http://localhost:5050 ***\n');
});