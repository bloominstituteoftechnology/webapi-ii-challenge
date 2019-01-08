// import your node modules
const express = require('express');

const db = require('./data/db');

// add your server code starting here
const server = express();

const PORT = 4545;
const parser = express.json();

server.use(parser);


server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
            console.log(`posts ${posts}`);
            res.status(200).send(posts) 
    })
    .catch(err => {
        res.status(500).send(`<h1>Bad Request<h1>`);
        //res.status(500).json({message: `failed to get users`});
    });
});
    

server.get('/api/posts/:id', (req, res) => {
    // console.log(req);
    console.log(req.params);
    const id = req.params.id;

    db.findById(id)
        .then( posts => {
            console.log(`posts = ${posts.id}`);
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ message: `User does not exist.`});
        });
    
});

//++++++++++++++++++++++++++++++++++++++++
// Day 2 - put post delete stuff here
//++++++++++++++++++++++++++++++++++++++++
server.post('/api/posts', (req, res) => {
    const black = req.body;
    console.log(req.body);
    if (a && b) {
        db.insert(post)
            .then((postData)=> {
                console.log('post from body', postData);
                db.findById(postData.id).then( (post) => {
                    res.status(201).json(post)
                });
            })
            .catch( (err) => {
                res.status(500)
                    .json({
                    message: `Failed to insert user into the db`
                })
            });

    } else {
        console.log("++++ERROR missing name or bio!! +++");
        res.status(400).json({ message: "missing manditory data"});
    }
});

server.delete('/api/posts/:id', (req, res) => {
    // const { id } = req.params;
    // or
    const id = req.params.id;
    console.log(id);
    db.findById(id)
    .then(user => {
        if (user) {

            db.remove(id)
                .then(deleteNum => {
                    console.log(deleteNum);
                    if (count) {
                        res.status(204).json(user);
                    } else {
                        res.status(404).json({ message: 'invalid id'});
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: `Your failed to Delete user, please try again.` })
                });

        } else {
            res.status(404)
                    .json({ message: 'This user with the specfied ID does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json({ message: `Your failed to Identify a user, please try again.` })
    });
});

//++++++++++++++++++++++++++++++++++++
//+++++++  Put  ++++++++++++ regular Put
//++++++++++++++++++++++++++++++++++++++





//++++++++++++++++++++++++++++++++++++
//Listener
//++++++++++++++++++++++++++++++++++++++

server.listen(PORT, () => {
    console.log(`The server is runnning on port ${PORT}`);
});


