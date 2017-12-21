console.log ('index is executed'); // CommonJS module syntax 
// import express from 'express'; // ES2015 module syntax 

const server = express(); // this is a web server 

server.get('/', function(req, res))
  console.log('page requested');
  res.send('Hello CS5');
})

server.listen(8000); 