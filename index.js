// import your node modules

const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

const PORT = "4000"

server.get('/api/posts', (req, res)  =>  {
    db.find()
        .then((users)   =>  {
            res.send(users);
        })
        .catch(err  =>  {
            console.log("error:", err);
        });
})

server.get('/api/posts/:id', (req, res)  =>  {
    const { id } = req.params;
    db.findById(id)
        .then((user)   =>  {
            res.send(user);
        })
        .catch(err  =>  {
            console.log("error:", err);
        });
})

// server.delete('/api/posts/:id', (req, res)    =>  {
//     const { id } = req.params;
//     db.remove(id)
//         .then((response)    =>  {
//             console.log(response)
//         })
//
// })

server.listen(PORT, () =>  {
    console.log("server started. Kind of..");
})
