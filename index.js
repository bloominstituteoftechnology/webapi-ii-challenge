const server = require('./server.js');

const PORT = 9090;

server.listen(PORT, () => {
  console.log(`Our server is listening on port ${PORT}`);
});