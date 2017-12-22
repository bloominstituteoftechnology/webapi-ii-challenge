const express = require( 'express' );
const cors = require('cors');

const server = express(); 
const allowedClients = {
  origin: 'http://yourapp.com'
}
;
server.use(function(req, res) {
    const account = {
        name: 'frodo',
        key: 'QSLKDJFSKD'
    }
}

if(req.query.apikey) {

}
// check for api key / /check on their database
// not valid, bounced
//valid, maybe add some stuff to the req or response
// call next(); // this is where they enter the request handlers
})
servers.use(cors(allowedClients));

server.get('/'.function(req, res) {
    res.status(200).send('You are here...');
});

server.listen(4000, function() {
    console.log('I see you');
});
