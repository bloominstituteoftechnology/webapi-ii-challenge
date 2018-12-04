// import your node modules
const express = require ('express')
const server = express()
const db = require('./data/db.js');
const NUM = 4444;
server.use(express.json());

server.get('/api/posts', (req,res) => {

    db.find()
    .then( (posts) => {res.json(posts)})
    .catch(err => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved."})})
})

server.get('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    db.findById(id)
    .then( post => {
        if (post.length > 0) {res.json(post)}

        else { 
            res
            .status(404)
            .json({message:"The post with the specified ID does not exist."})}
    })
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get post"})
    })
})

// add your server code starting here

server.post('/api/posts', (req,res) => {
    const post = req.body;
    if (post.title && post.contents){
        db.insert(post)
    .then(info => {
        db.findById(info.id).then(post => {
            res
            .status(201)
            .json(post)})
        })
        
    .catch(err => {
        res
        .status(500)
        .json({message: "failed to get post"})
    })
    }

    else {
        res
        .status(400)
        .json({menssage: "missing title or bio"})
    }
    
})


server.delete('/api/posts/:id', (req,res) => {
    const {id} = req.params;
    db.remove(id)
    .then(count => {
        if(count) {
            res.json({message: "post deleted"})
        }
        else {
            res
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The post could not be removed"})
    })
})


server.put('/api/posts/:id', (req,res) => {
    const post = req.body;
    const {id} = req.params;
    if (post.title && post.contents) {
        db.update(id, post)
        .then(count => {
            if (count) {
                db.findById().then( post => {
                    res.json(post)}
                )
            }

            else { res
                .status(404)
                .json({message:"The post with the specified ID does not exist."})}
        })
        .catch(
            err => {
                res
                .status(500)
                .json({error: "The post could not be removed"})
            }
        )

    }

    else {
        res
        .status(400)
        .json({message: "missing title or bio"})
    }

})

server.listen(NUM, () => console.log(`listening on port ${NUM}`))
