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
            if(posts.length > 0){ // checks if any posts were found
                res
                    .status(200)
                    .json(posts);
            }else{
                res
                    .status(404)
                    .json({ message: `No posts found!` }); // no posts found
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: `The posts could not be retrieved.` }); // database error
        })
    
});

//get by id
server.get(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if(post.length > 0){
                res
                    .status(200)
                    .json(post[0]); // result is an array with one result, send it as an object
            }else{
                res
                    .status(404)
                    .json({ message: `The post does not exist.` }); // post doesn't exist
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({ error: `The post information could not be retrieved. Internal server error!` }); // database error
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
            .json({ errorMessage: `Please provide title and contents for the post.` })
            return;
    }

    // create new post object
    const newPost = {title, contents};

    //insert it in the database
    db
        .insert(newPost)
        .then(response => {
            db
                .findById(response.id)
                .then(post => {
                    if(post.length > 0){
                        res
                            .status(200)
                            .json(post[0]); // result is an array with one result, send it as an object
                    }else{
                        res
                            .status(404)
                            .json({ message: `The post was not created.` }); // post doesn't exist, so was not created
                    }
                });
        }).catch(err => {
            res
                .status(500)
                .json({error: `There was an error while saving the post to the database. Internal server error`});
        });
});

//put
server.put(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    const postUpdates = req.body;

    // update
    db
        .update(id, postUpdates)
        .then(count => {
            if(count > 0){
                // update done
                db
                .findById(id)
                .then(updatedPost => {
                    if(updatedPost.length > 0){
                        res
                            .status(200)
                            .json(updatedPost[0]); // result is an array with one result, send it as an object
                    }else{
                        res
                            .status(400) // check if this is correct?
                            .json({ message: `Error encountered` }); // update occured but an error happened
                    }
                });
            }else{
                res
                    .status(404)
                    .json({ message: `The post was not updated.` }); // nothing was updated
            }
        })
        .catch(error => {
            res 
                .status(500)
                .json({ error: `The post information could not be modified.` }); // database error
            return;
        });
});

//delete
server.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(response => {
            if(response.length > 0){
                // make a copy of the post
                const post = { ...response[0] };
                db
                    .remove(id)
                    .then(count => {
                        res
                            .status(200)
                            .json(post); // send the post deleted back with the response
                    })
            }else{
                res
                    .status(404)
                    .json({ message: `The post was not deleted.` }); // post doesn't exist?? somehow!!
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: `he post could not be removed. Internal server error!` }); // database error
        });  
});

const port = 5000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});