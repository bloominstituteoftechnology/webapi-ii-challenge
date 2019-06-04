const express = require('express'); //express package import
const server = express(); // server creation

server.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);