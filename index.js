// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');

const server = express();

server.get('/',(req,res) => {
res.send('use the endpoints "/posts", or "/posts/"number" to view either all posts, or a single post by id number')
});

server.get('/posts',(req,res)=>{
db.find()
	.then(data =>
	res.status(200).json(data)
	)
	.catch(()=>{
	res.status(500).json({text:'internal server error'})
	})
});

server.get('/posts/:id',(req,res)=>{
db.findById(req.params.id)
	.then(data =>{
	if(data.length){
	res.status(200).json(data)
	}
	else{
	res.status(404).json({message:'post not found'})
	}
	})
	.catch(()=>{
	res.status(500).json({text:'internal server error'})
	})
})

server.listen(3333, () => console.log('server listening on port 3333'));