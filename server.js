// import your node modules
const express = require('express'); //commonJS modules

const db = require('./data/db.js');

const server = express(); 

//comfigure middleware for the server
server.use(express.json()); // this teaches express to parse json information from req.body


//configure routing (form of middleware)
server.get('/', (req, res) => {
    res.send('Hello FSW12');
});


server.get('/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users);
    }
    ).catch(fail => {
        console.log('fail', fail)
        res.status(500).json({message: 'Error getting the data'});
    });
})



// add your server code starting here





server.post('/api/posts', (req, res) => {
    // const {variables that contain the key value with it's same name} (= from) inside.of.this.object.variables.

    const { title, contents } = req.body; //this requires the express.json() middleware
    /*
        In req.body, there's two properties:
            title, contents
        We can declare variables easily through destructuring
        So,
            const { title , contents } = req.body;
        Is the same as
            const title = req.body.title;
            const contents = req.body.contents;
    */

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

    const post = {
        title,
        contents
    };

    db.insert(post)
        .then((obj)=> { // obj will look like { id: 123 }
            const id = obj.id;

            db.findById(id)
                .then((post) => {
                    res.status(201).json(post);
                })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the post to the database." });
                });
        })
        .catch((fail) => {
            console.log(fail);
            res.status(500).json({ error: "There was an error while saving the post to the database." });
        });
});


server.get('/api/posts', (request, response) => {
    db.find()
        .then((posts) => {
            response.json(posts);
            //if no status added then it defaults to 200 success

        })
        .catch((fail) => {
            console.log(fail);
            response.status(500).json({ error: 'The posts information could not be retrieved.'});
        })
});


server.get(`/api/posts/:id`, (req,res) => {
    const {id} = req.params;

    db.findById(id)
        .then((post) => {
            const id = post.id;
            res.json(post);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({message: "The post with the specified ID does not exist."});
        })

    .catch((fail) => {
        console.log(fail)
        res.status(500).json({error: "The post information could not be retrieved."});
    })
})



server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;

        db.findById(id)
            .then((post) => {
                res.status(201).json(post);
            })
            .catch((fail) => {
                console.log(fail);
                res.status(404).json({ message: "The post with the specified ID does not exist."});
            });
  
    db.remove(id)
        .then((posts) => {
            response.json(posts);
        })
        .catch((fail) => {
            console.log(fail);
            response.status(500).json({
                error: "The post could not be removed"
            });
        })
});


server.put(`/api/posts/:id`, (req, res) => {
    const {id} = req.params;

    db.findById(id)
    .then((post) => {
        res.status(201).json(post);
    })
    .catch((fail) => {
        console.log(fail);
        res.status(404).json({ message: "The post with the specified ID does not exist."});
    });

    
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }



    db.update(id, post)
        .then((posts) => {
            response.json(posts);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(500).json({error: "The post information could not be modified."})
        })


    db.insert(post)
        res.status(200);
        return post;

})







//start the server
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));







