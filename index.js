// import your node modules
const express = require("express")
const db = require('./data/db.js');
// add your server code starting here
const server = express();
const PORT = 4000; 

server.use(express.json());

//GET
server.get(`/api/posts`, (req, res) => {
        db.find()
            .then((posts) => {
            res.json(posts);
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage: "Posts Not Found" })
        })
})

//GET
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then((posts) => {
            
            if (posts.length > 0) {
                res.status(200)
                    .send(posts)
                }
            else {
                res
                 .status(404)
                 .json({ errorMessage: "Post Id Not Found" })
                }
        }) //end of posts
        .catch(err => {
                res
                 .status(500)
                 .json({ errorMessage: "Post Id Not Found" })
        });
})

//POST

server.post('/api/posts', (req, res) => {
    const post = req.body;
    console.log(post);
    if(post.title && post.contents) {
        db.insert( post )
        .then( idInfo => {
            db.findById( idInfo.id )
                .then( newPost => {
                    res
                     .status(201)
                     .send(newPost);
                }) // newPost end
        }) // idInfo end   
    }
    else if(post.title || post.content === undefined) {
        res
         .status(400)
         .json({errorMessage: "Please provide title and contents for the post." })
        }
    else {
        res
         .status(500)
         .json({ error: "There was an error while saving the post to the database" })
    }
});


//DELETE

server.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    console.log( id );
    db.remove(id)
     .then( post => {
         if(post) {
            res
             .json({ message: "Delete success" });
         }
         else  {
            res
             .status(404)
             .json({message: "The post with the specified ID does not exist."})
         }
     })
     .catch( err => {
            res
             .status(500)
             .json({error: "The post could not be removed"})
     })
        
})



//PUT

server.put('/api/posts/:id', (req, res) => {
        const  post  = req.body;
        const  { id }  = req.params;
        if (post.title && post.contents ) {
            db.update(id , post)
                .then( postEdit => {
                    res
                     .status(200)
                     .sendStatus(postEdit)
                })  
            }
         else if(id != req.params){ 
               res
                .status(404)
                .json({message: "The post with the specified ID does not exist." })
              }
              
            else {
                   res
                   .status(500) 
                   .json({ error: "The post could not be removed" })
            }
      
        // else {
        //     res.status(404)
        //     .json({
        //        message: "The post with the specified ID does not exist."
        //     })
        // }
        // res.catch ( err => {
        //     res.status(400)
        //     .json({
        //         errorMessage: "Please provide title and contents for the post."
        //     })
        // })
                    
})

    server.listen(PORT, () => {
        console.log("Server Listening...")
    })