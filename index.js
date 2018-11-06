// import your node modules
const express = require('express')
const cors = require('cors')
const server = express();

server.use(cors());
server.use(express.json())

server.listen(5050, ()=> console.log('the server is up!'))
const db = require('./data/db.js');



server.post('/api/posts', async (req,res) => {
    const body = req.body;
    if(!body.contents || !body.title){
        res.status(400).json({message:"Please provide title and contents for the post"})
    } else 
    {
        try {
            const data = await db.insert(body);
            const quote = await db.findById(data.id);
            res.status(201).json(quote)        
        } catch (error) {
            res.status(500).json({message:"Error occurred while creating resource: " + error})
        }
    }
})

server.get('/api/posts',(req,res)=>{
    db.find().then((value)=>{ res.status(200).send(value)})
             .catch(error => { res.status(500).send({ error: "The posts information could not be retrieved." })})   
})

server.get('/api/posts/:id',(req,res)=>{
    db.findById(req.params.id)
      .then((value)=>{ 
        res.status(200).send(value[0])
           })
      .catch(error => { res.status(404).send({ message: "The post with the specified ID does not exist." })})   
})


server.put('/api/posts/:id', async (req,res)=>{
    const { id } = req.params;
    const body = req.body;
    if(!body.contents || !body.title){
        res.status(400).json({message:"Please provide title and contents for the post"})
    } else 
    {
        try {
            const data = await db.update(id,body)
            if(data>0){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: "The resource was not found for update"})
            }
        } catch (error) {
            res.status(500).json({message:"Error occurred while updating the resource: " + error})        
        }
    }
})



server.delete('/api/posts/:id',async (req,res)=>{
    const { id } = req.params;
    try {
        const data = await db.remove(id);
        if(data>0){
            res.status(200).json(data)
        }
        else {
            res.status(404).json({message: ("Error occured while deleting. The record does not exist")})
        }
        
    } catch (error) {
        res.status(500).json({message: ("Error occured while deleting. " + error)})
    }
})
