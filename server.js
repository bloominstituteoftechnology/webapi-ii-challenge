// import your node modules
const express = require("express")
const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(express.json());

//find posts
server.get('/api/posts', (requestAnimationFrame, res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({error:"Sorry, we can't find posts"});
    })
});




server.listen(8000, () => console.log("API running on port 8000"));