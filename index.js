// import your node modules
const express = require("express"); //Importing express
const bodyParser = require("body-parser"); //Importing body parser, which allows the server to read the body of the http request sent
const server = express(); //Initializes the server
const PORT = 4000; //Sets up port it is being hosted on, we are only able to set the port manually like this because we are hosting it locally

const db = require('./data/db.js'); //Provides us with prewriten functions for interacting with database

// add your server code starting here

server.use(bodyParser.urlencoded({ extended: true })); //Makes body parser work
server.use(bodyParser.json()); //Makes body parser work

server.get("/api/posts", (req, res) => { //Function that when the server recieves at get request at url/api/posts runs function
    db.find().then(posts => { //Tuns .find fron db.js and returns all posts in database, and then it takes the posts returned
        res.json(posts); // and runs .json from respond that takes all the posts and sends back all the posts to the request as a .json file
    }).catch(error => { //If theres an error
        res.status(500).json({error: "The posts information could not be retrieved."}); //Send error back to sender of request with a status code of 500
    });
});

server.post("/api/posts", (req, res) => { //Function that when the server recieves at post request at url/api/posts runs function
    let newPost = { // Creates a object that is a new posts
        title: req.body.title, //Sets a up a key of title and sets the value to the body.title of the request
        contents: req.body.contents // ^ Same thing but with contents
    };

    if (newPost.title && newPost.contents) { //If the requester has sent a title and contents for the new post (there is no mess up)
        db.insert(newPost).then(post => { //Uses .insert from db to add new post to database
            res.status(201).json(post); //Respond with status 201, and returns the post inserted
        }).catch(error => { //If error
            res.status(500).json({error: "There was an error while saving the post to the database"}); //Return status 500 with message
        });
    } else { 
        res.status(400).json({errorMessage: "Please provide title and contents for the post."}) //If the new post that is being sent does not error, but does not have proper contents, return error prompting user to re-enter title and contents
    }

});

server.get("/api/posts/:id", (req, res) => { //If a request is recived that the user wants to look at a specfic posts
    let id = req.params.id; //Set the parameter requested that we gave the name id (from /api/posts/:id) to a variable called id
    db.findById(id).then(post => { //Uses the find by id function from db.js to find a specific post using the id which we are calling post, then
        res.json(post); //Sending that post through res.json to return that specifc post back to the user
    }).catch(error => { //If error
        res.status(404).json({message: "The post with the specified ID does not exist."}); //Send user 404 message that it does not exist
    });
});

server.put("/api/posts/:id", (req, res) => { //Makes a put request to edit a specific post
    let id = req.params.id; //Sets variable id to be the parameter/or post id that is being sent
    let update = req.body; //Sets variable update to be the new content of the post that they are editing

    if (update.title && update.contents) { //If server recieves a new title and new contents
        db.update(id, update).then(post => { //Use .update function from db.js to then update the database with the new post information and
            res.status(200).json(post); //Return that updated post that is now in the database to the user
        }).catch(error => { //If error
            res.status(500).json({error: "The post information could not be modified."}); //Send back 500 code internal server error
        });
    } else { //If the user has successfully sent a request but the content and title is not properly formatted
        res.status(400).json({errorMessage: "Please provide title and contents for the post."}); //Return status 400 prompting user to enter appropriate information
    }
});

server.delete("/api/posts/:id", (req, res) => { //User sends request to delete a specific post by id
    let id = req.params.id; //Setting variable id to be the id parameter sent from the url
    db.remove(id).then(post => { //Uses .remove function from db.js to remove the post from the database, then
        res.status(200).json(post); //Return a response status of 200 and the number of posts deleted(?) or returning 1 to mean true(?)
    }).catch(error => { //If error
        res.status(500).json({error: "The post could not be removed"}); //Return response internal server error 500 post could not be removed
    });
});

server.listen(PORT, function() { //Have server listen to port variable set, 
    console.log(`API server listening on port: ${PORT}`); //Console log listening to port to indicate that it is working
});