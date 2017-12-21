const { server } = require('./server.js');

server.get('/', (req, res) => {
  // console.log('page requested');
  res.send('<h1>At first I was afraid</h1>');
});

server.listen(3000);
