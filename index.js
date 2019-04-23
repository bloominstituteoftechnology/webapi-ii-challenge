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
server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
