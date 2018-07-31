const express = require('express');
const db = require('./data/db.js');
const server = express();

server.get('/', (req,res) => {
		res.send('use the endpoints "/posts", or "/posts/"number" to view either all users, or a single user by id number');
	}
);

server.get('/posts', (req,res) => {
db.find()
	.then(response =>
	res.status(200).json(response)
	)
	.catch(() =>
	res.status(500).json({message:"Internal server error"})
	)
});

server.get('/posts/:id', (req,res) => {
let {id} = req.params; 
db.findById(id)
	.then(response => {
	if(response.length < 1){
		res.status(404).json({message:"The user with that specified ID does not exist."})
		}
	else {
		res.status(200).json(response)
		}
	}
	)
	.catch(()=>
	res.status(500).json({message:"Internal server error"})
	)
});

server.post('/posts', (req,res) => {
const { title, contents, created_at, updated_at } = req.query;
if(!title || !contents){
res.status(400).json({message:"Please make sure you have a name and bio"});
return;
}
db.insert({title,contents})
	.then (response => {
	res.status(200).json(response)	
	})
	.catch(()=>{
	res.status(500).json({message:"Internal server error"})
	})
});

server.delete('/posts/:id', (req,res) => {
const { id } = req.params;
db.remove(id)
	.then(response => {
		if(response===0){
		res.status(404).json({message:'The user with that ID does not exist.'});
        return;
		}
		else{
		res.json({message:`id ${id} was removed!`});
		}
	}
	
	)
	.catch(error => {
    res.status(500).json({message:'The user could not be removed'});
    return;
	})
});

server.listen(8000, () => console.log('API running on port 8000'));










