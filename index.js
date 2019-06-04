const express = require('express'); //express package import
const server = require('./server'); 



server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);