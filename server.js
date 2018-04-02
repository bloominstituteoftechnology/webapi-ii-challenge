// import your node modules
const express = require(`express`);
const bodyParser = require(`body-parser`);

const db = require(`./data/db.js`);

// add your server code starting here
const server = express();
server.use(bodyParser.json());

// get
server.get(`/api/posts`, (req, res) => {
    db
        .find()
        .then(posts => {
            if(posts.length){
                res
                    .status(200)
                    .json(posts);
            }else{
                res.json({ message: "No posts found" })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
        })
    
});

//get by id
server.get(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if(post.length){
                res
                    .status(200)
                    .json(post[0]);
            }else{
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
        });
});

//post
server.post(`/api/posts`, (req, res) => {
    const body =  req.body !== undefined ? req.body : {};
    const {title, contents } = body;

    // check if title and content are set
    if(title === undefined || contents === undefined){
        res 
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
            return;
    }

    // create new post object
    const newPost = {title, contents};
    console.log(newPost)

    //insert it in the database
    db
        .insert(newPost)
        .then(response => {
            const post = {...response, title, contents}
            res
            .status(201)
            .json(post);
        }).catch(err => {
            res
                .status(500)
                .json({error: "There was an error while saving the post to the database"});
        });
});

//put
server.put(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    // find
    db
        .findById(id)
        .then(post => {
            // continue
        })
        .catch(err => {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
                return;
        })
    
    // if you reach here
    const body =  req.body !== undefined ? req.body : {};
    const {title, contents } = body;
    const updatedPost = {title, contents};

    // check if title and content are set
    if(title === undefined || contents === undefined){
        res 
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
            return;
    }

    if(updatedPost !== undefined){
        db
            .update(id, updatedPost)
            .then(response => {
                res 
                    .status(200)
                    .json({...updatedPost, id});
                    return;
            })
            .catch(error => {
                res 
                    .status(500)
                    .json({ error: "The post information could not be modified." });
                return;
            })
            return;
    }

    res
        .status(500)
        .json({error: "Post was not updated"})
        return;
});

//delete
server.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            db
                .remove(id)
                .then(post =>{
                    res.json({message: 'post removed'})
                })
                .catch(error => {
                    res
                        .status(500)
                        .json({ error: "The post could not be removed" });
                });
        })
        .catch(err => {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
        });
        
});

const port = 5000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});