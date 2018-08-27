// import your node modules

//require the express module, use '$ yarn add to include in project'
const express = require('express');

const helmet = require ('helmet');

//connects to our database
const db = require('./data/db.js');

//creates an express application using the express module
const server = express();

// add your server code starting here
server.use(helmet());
server.use(express.json()); //allows parsing of data

const nextId = 10;

//Configures our server to execute a function for every GET request to "/"
//the second argument passed to the .get() method is the "Route Handler Function"
//the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
    //express will pass the request and response objects to this function
    //.send() on the response object can be used to send a response to the client
    res.send('Server Initiated');
});

//Configuring Routing with specific endpoint
//GET request
let posts = server.get('/posts', (req,res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.error('error',err);
        res.status(500).json({message: 'Error getting data'})
    });
});

//POST request
server.post('/posts', (req,res) => {
    const post = {id: nextId++, ...req.body}
    console.log(post)
    posts.push(post);

    res.status(200).json(posts);
});

//DELETE request
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    //delete the post referencing the id
    posts = posts.filter(p = p.id != id) //filter out posts not equal to the selected post (id is a number, so use = )
    res.status(200).json(posts);
})

//Once the server is fully configured, we can have it listen for connections on a particular port
//the callback function passed as the second argument will run once when the server starts
server.listen(9000, () => console.log('\n==API on port 9k==\n'));