// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require ('express'),
      server = express(),
      PORT = 4005,
      bodyParser = require("body-parser");
   
//Here we are configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


// GET ENDPOINT REQUEST FOR POSTS
server.get('/api/posts', (req, res) =>{
    db.find()
    .then((posts) =>{
        res
        .json(posts)})
    .catch( err => { 
        res
        .status(500)
        .json({
            error: "The posts information could not be retrieved."
        })})
});

// GET ENDPOINT REQUEST FOR SINGLE POST
server.get('/api/posts/:id', (req, res) =>{
    
    const {id} = req.params;
    
    db.findById(id)
    .then(post =>{
        if (post.length !== 0){
            res
            .json(post)
        }
        else{
            res
            .status(404)
            .json({
                message: "The post with the specified ID does not exist."
            });
        }})
    .catch( err => {
         res
         .status(500)
         .json({
            error: "The post information could not be retrieved."
        })});
});


//POST ENDPOINT  
server.post('/api/posts', (req, res) =>{
    const post = req.body;
    db.insert(post)
    .then(postId =>{
        db.findById(postId.id)
        .then(post =>{
            console.log(post[0].title)
           if (post[0].title !=="" && post[0].contents !=="" ){
            res.status(201).json(post)
           }
           else{
            res
            .status(400)
            .json({
                errorMessage: "Please provide title and contents for the post."
            })}   
               
           })})
    .catch( err => {
         res
         .status(500)
         .json({
            error: "There was an error while saving the post to the database"
        })});
})


//DELETE ENDPOINT  
server.delete('/api/posts/:id', (req, res) =>{
    const {id} = req.params;
    db.findById(id)
    .then(post =>{
        if (post.length !== 0){
           db.remove(id)
    .then(delId =>{
        if (delId){
            res.status(201).json({ message: "Successfully deleted"})
        }
    })}
        else{
            res.status(401).json({
                message: "The post with the specified ID does not exist."    
            })
        }
    })
    .catch( err => {
         res
         .status(500)
         .json({
            error: "The post could not be removed"
        })});
})

//PUT ENDPOINT 


server.put('/api/posts/:id', (req, res) =>{
    const updatePost = req.body;
    const {id} =req.params;
    console.log(updatePost)

    if (updatePost.title && updatePost.contents ){
        // message: "Successfully Updated"
        console.log('id:',id)
        db.findById(id)
    .then(oldPost =>{
        console.log('oldpost',oldPost)
                if (oldPost.length !== 0){

                    db.update(id, updatePost)
                    .then(updatedPostId =>{
                        res.status(201).json({ message: "Successfully updated"})

                    })
                    .catch( err => {
                        res
                        .status(500)
                        .json({
                           error: "The post could not be updated"
                       })});
                }
                else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist."
                    })
                }})}
    else{
        // errorMessage: "Please provide title and contents for the post." }) 
    res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
    })
    }
})
 

server.listen(PORT, () =>{
    console.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`)
});