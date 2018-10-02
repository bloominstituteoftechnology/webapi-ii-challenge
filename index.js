// import your node modules

const db = require('./data/db.js');

// add your server code starting here

const express = require('express');

const server = express();

server.use(express.json()); 

server.get('/',(req,res) => {
res.send('use the endpoints "/posts", or "/posts/"number" to view either all posts, or a single post by id number')
});

server.get('/posts',(req,res)=>{
db.find()
	.then(data =>
	res.status(200).json(data)
	)
	.catch(()=>{
	res.status(500).json({message:'internal server error'})
	})
});

server.get('/posts/:id',(req,res)=>{
const { id } = req.params;
db.findById(id)
	.then(data =>{
	if(data.length){
	res.status(200).json(data)
	}
	else{
	res.status(404).json({message:'post not found'})
	}
	})
	.catch(()=>{
	res.status(500).json({message:'internal server error'})
	})
});

server.delete('/posts/:id',(req,res)=>{
const { id } = req.params;
db.remove(id)
	.then(response => {
	if(!!response){res.status(202).json({message:'post succesfully deleted'})}
	else{res.status(404).json({message:'user not found'})}
	})
	.catch(()=>{
	res.status(500).json({message:'internal server error'})
	})
});

server.post('/posts',(req,res)=>{
const { title,contents } = req.body;
if(!title || !contents){
res.status(400).json({message:"Please make sure you have a name and contents"});
return;
}
const newPost = { title,contents };
db.insert(newPost)
	.then(() => {
	res.status(200).json({message:'post succesfully posted'})
	})
	.catch(()=>{
	res.status(500).json({message:'internal server error'})
	})
});

server.put('/posts/:id',(req,res)=>{
const { id } = req.params;
const { title,contents } = req.body;
if(!title && !contents){db.remove(id)
	.then(response => {
	if(!!response){res.status(202).json({message:'post succesfully deleted'})}
	else{res.status(404).json({message:'user not found'})}
	})
	.catch(()=>{
	res.status(500).json({message:'internal server error'})
	})
return;}
else if (!title || !contents){res.status(400).json({message:"Please make sure you have a name and contents"});
return;}
const newPost = { title,contents };
db.update(id,newPost)
.then((response)=>{
	if(!!response){res.status(200).json({message:'post succesfully updated'})}
	else{res.status(404).json({message:'user not found'})}
	})
.catch(()=>{
	res.status(500).json({message:'internal server error'})
	})
});

server.listen(3333, () => console.log('server listening on port 3333'));














