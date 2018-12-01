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
        .then(( posts ) => {
            if( posts.length > 0 ) {
            res.status(200)
            .send(posts)
            }
            else {
                res
                .status(404)
                .json({errorMessage: "Post Id Not Found"})
            }
        })
        .catch( err => {
            res
            .status(500)
            .json({errorMessage: "Post Id Not Found"})
        })
})

//POST
server.post('/api/post', (req, res) => {
    const post = req.body;
    if (post.title && post.content) {
        db.insert(post)
            .then(idInfo => {
                db.findById(idInfo.id)
                    .then ( post => {
                    res
                    .status(201).json( post );
                })
                res.status(201).json( idInfo )
                    .catch( err => {
                        res
                            .status(400)
                            .json({
                                errorMessage: "Please provide title and contents for the post."
                            })
                    })
            })
    }
})

//DELETE

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(post => {
            if (post) {
                db.json({ message: "Delete success" })
            }
            else {
                res.status(404)
                    .json({ message: "Invalid Id" })
            }
        })
        .catch(err => {
            res
                .status(400)
                .json({
                    errorMessage: "Delete Failed"
                });
        })
})

//PUT

//     server.put('/api/posts/:id', (req, res) => {
//         const { post } = req.body;
//         const { id } = req.params;
//         if (post.title && post.content) {
//             db.update(id, post)
//                 .then(count => {
//                     db.send(count)
//                 })
//         }
//         else {
//             res.status(404)
//             .json({
//                 message: "The post with the specified ID does not exist."
//             })
//         }
//         res.catch ( err => {
//             res.status(400)
//             .json({
//                 errorMessage: "Please provide title and contents for the post."
//             })
//         })
                    
// })


    server.listen(PORT, () => {
        console.log("this is  working")
    })