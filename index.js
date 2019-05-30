const server = require('./api/server.js');

server.listen(5050, () => {
  console.log('\n*** Server Running on http://localhost:5050 ***\n');
});
