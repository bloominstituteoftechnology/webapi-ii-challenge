// import your node modules
const express=require('express');
const introduce=require('./introduce.js');
const db = require('./data/db.js');
// add your server code starting here
const server=express();
    server.get('/',(req,res)=>{
        res.json('alive');
    });
    server.get('/greet',(req,res)=>{
        res.json({hello:'stranger'});
    });
    server.get('/api/users/:id',(req,res)=>{
        const{id}=req.params;
        db.findById(id).then(user=>{
            if(user){
                res.status(200).json(user);
            }else{
                res.status(404).json({message:'User Not Found'})
            }
        }).catch(err=>{
            res.status(500).json({message:"Our Bad, Try Again", error: err})
        });
    })
    server.get('/greet/:person',introduce);
      server.listen(9000,()=>console.log('working server?'));


