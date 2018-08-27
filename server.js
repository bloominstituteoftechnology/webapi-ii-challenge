// import your node modules

//require the express module, use '$ yarn add to include in project'
const express = require('express');

//connects to our database
const db = require('./data/db.js');

//creates an express application using the express module
const server = express();

// add your server code starting here
server.use(express.json());

//Configures our server to execute a function for every GET request to "/"
//the second argument passed to the .get() method is the "Route Handler Function"
//the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
    //express will pass the request and response objects to this function
    //.send() on the response object can be used to send a response to the client
    res.send('Server Initiated');
});

//Configuring Routing with specific endpoint
server.get('/posts', (req,res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error',err);
        res.status(500).json({message: 'Error getting data'})
    });
});


//Once the server is fully configured, we can have it listen for connections on a particular port
//the callback function passed as the second argument will run once when the server starts
server.listen(9000, () => console.log('\n==API on port 9k==\n'));