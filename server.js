// import your node modules
const express=require('express');

const db = require('./data/db.js');

const server=express();

server.use(express.json());
// add your server code starting here

server.get('/posts',(req,res)=>
    db.find().then(posts=>res.status(200).json(posts)).catch(err=>res.status(500).json({error: "The posts information could not be retrieved."}))
)


server.listen(9000,()=>console.log('Engines firing server starting new horizons venturing.'))