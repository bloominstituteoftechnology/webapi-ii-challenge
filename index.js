// import your node modules
const db = require('./data/db.js');
const express = require('express');
const server = express();

// add your server code starting here
server.get('/', (req, res) => {
    res.send("<h2>Hello Welcome to Yusuf's Server</h2>")
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res
                .status(200)
                .json(posts)
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "The posts information could not be retrieved.", error: error })
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params

    db.findById(id)
        .then(post => {
            if (post) {
                res
                    .status(200)
                    .json(post)
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res
                .status(500)
                .json({ message: "The post information could not be retrieved.", error: error })
        })
})

// server.post('/api/posts', async (req, res) => {
//     try {
//         const postData = req.body
//         const postId = await db.insert(postData)
//         const post = await db.findById(postId.id)
//         res
//             .status(201)
//             .json(post)
//     } catch (error) {
//         let message = 
//     }
// })

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            if (count) {
                res
                    .status(200)
                    .json(count)
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catcj(error => {
            res
                .status(500)
                .json({ message: "The post could not be removed", error: error })
        })
})



server.listen(8000, () => console.log('server is alive'));