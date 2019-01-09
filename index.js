// import your node modules
const express = require('express');
const db = require('./data/db');

// add your server code starting here
const server = express();

const PORT = 4545;

//++++++++++++++++++++++++ 
// middlewear  and addins
//+++++++++++++++++++++++
const parser = express.json();
server.use(parser);


// wire up middleware
// server.use(express.json());



server.get('/api/posts', (req, res) => {
    db.find()
    .then( posts => {
            console.log(`posts = ${posts}`);
            res.status(200).send(posts); 
    })
    .catch(err => {
        // res.status(500).send(`<h1>Bad Request<h1>`);
        res.status(500).json({message: `failed to get users`});
        //res.(status(500).json(err);
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
    const post = req.body;
    console.log(req.body);
    if (post.title && post.contents) {
        db.insert(post)
            .then( postData => {
                console.log('post from body', postData);
                db.findById(postData.id).then( post => {
                    res.status(201).json(post);
                });
            })
            .catch( (err) => {
                res.status(500)
                    .json({
                    message: `Failed to insert user into the db`
                })
            });

    } else {
        console.log("++++ERROR missing title or contents!! +++");
        res.status(400).json({ message: "missing manditory data!!"});
    }
});





//++++++++++++++++++++++++++++++++++++
//+++++++  Put  ++++++++++++ regular Put
//++++++++++++++++++++++++++++++++++++++

server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.findById(id)
      .then(post => {
        if (!post) {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
        if (!changes.title || !changes.contents) {
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
          });
        }
        db.update(id, changes).then(newPost => {
          res.status(200).json(newPost);
        });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
      );
  });


server.delete("/api/posts/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const thisToGo = await db.findById(id);

        if ( thisToGo === 0 || thisToGo === []) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }

        const thisPostGone = await db.remove(id);
        if ( thisPostGone === 1 ) {
            res.status(200).json(thisToGo);
        }

    } catch (error) {
        res.status(500),json({ error: "The post could not be removed" })
    }
});




//++++++++++++++++++++++++++++++++++++
//Listener
//++++++++++++++++++++++++++++++++++++++

server.listen( PORT, () => {
    console.log(`The server is runnning on port ${ PORT }`);

});


