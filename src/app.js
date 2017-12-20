const { server } = require('./server.js');

server.get("/", function( req, res ) {
	console.log('page requested');
	res.send('<h1>Hello cruel world</h1>');
});

server.listen(3000);
