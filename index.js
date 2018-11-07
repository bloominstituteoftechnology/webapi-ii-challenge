// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here

const server = express();

server.use(cors());
server.use(express.json());


server.get('/api/posts', (req, res) => {   // Could also abstract away this function to another file and import it here as -- const greeter = require('./greeter.js')
db.find()
.then(users => res.status(200).json(users))
.catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

server.get('/api/posts/:id', (req, res) => {   // Could also abstract away this function to another file and import it here as -- const greeter = require('./greeter.js')
const { id } = req.params;
db.findById(id)
.then(post => {                              // returns and empty array if !present
    if(post.length){                        // empty arrays are always truthy. arr.length is boolean
        res.status(200).json(post)}
    else {
        res.status(400).json({ message: "The post with the specified ID does not exist." })
    }})
.catch(err => res.status(500).json({ error: "The post's information could not be retrieved." }))
});


server.post('/api/posts', (req, res) => {  // In a post request, the desired data should generally be present within the body. 
    const { title, contents } = req.body;
    console.log(req.body)
    if(title && contents){
        const post = {title, contents};
        db.insert(post)
        .then(post => {
            res.status(201).json(post)
        } )
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))}
    else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

server.delete('/api/posts/:id', (req, res) => {
        const {id} = req.params;
        db.remove(id)
        .then(post =>{  // returns a 0 or 1 if !present or present
           if(post) {
            res.status(200).json({message: 'Post Deleted Successfully'})
                }
           else{
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
    }
            )
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
    
    
})

server.put('/api/posts/:id', (req, res)  => {
    const { id } = req.params;
    const { title, contents} = req.body;
    const newPost = {title, contents}
    db.findById(id).then(post => {console.log('PUT',post)
        if(!post.length){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        else{
            title && contents ? 
            db.update(id, newPost)
            .then(post => {                  
                db.findById(id).then(r => res.status(200).json(r))
                })
            .catch(err => res.status(500).json({ error: "The post information could not be modified" }))

            : res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

        }
        
        
        
    });
    




})
/* 500{ error: "The post could not be removed" }404{ message: "The post with the specified ID does not exist." } */
server.listen(9000, () => console.log(`Server running on Port 9000`))


