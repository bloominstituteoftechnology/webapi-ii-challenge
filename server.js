// import your node modules
const express = require("express")
const bodyParser = require("body-parser")
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

// server.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })



server.get("/", (req, res) => {
    res.send("It works, moving on")
})

server.post("/api/posts", (req, res) => {
    db.insert({
        title: "",
        contents: "",
    }).then(posts => {
        console.log('posted')
    }).catch(err => {
        res.statusCode === 400;
        return res.json({
            error: "The posts information could not be retrieved."
        })
    })
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const newPost = req.body;
    db.update(id, newPost)
    .then(post => {
        console.log('idk')
        res.json(post);

    })
    .catch(err => {
        console.log('failed')
        res.status(500).json({error: err});
    });
});


server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => {
        res.statusCode = 500;
        return res.json({
            error: "There was an error while saving the post to the database"
        })
    })
})

server.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;

    db.findById(id).then(user => {
        res.json(user)
    }).catch(err => {
        res.statusCode = 500;
    })
})

server.delete("/api/posts/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id).then(post => {
        console.log('deleted')
    }).catch(err => {
        res.statusCode = 500;
    })
})


server.listen(5000, () => console.log("listening on port 5000"));