const express = require('express');
const db = require("./data/db")
const server = express();
server.use(express.json())
//-------------------------------------
server.get("/",(req,res)=>{
    console.log("WORKING")
})
//-------------------------------------
server.get("/api/posts",(req,res)=>{
    db.find()
    .then(message=>{
        res.status(200).json(message)
})
    .catch(err=>{
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
//-------------------------------------
server.get("/api/posts/:id",(req,res)=>{
    const messageID = req.params.id
    db.findById(messageID)
    .then(message=>{
        if(!messageID){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }else
        res.status(200).json(message)
    })
    .catch(err=>{
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})
//-------------------------------------
server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
