/* PRIMARY DEFINITIONS AND DEPENDANCIES */

const DB = require('./data/db.js');
const EXP = require('express');
SERVER = EXP();
console.log("Starting server... \t:^)\n");
const PORT = 4000;

/* MAIN SERVER SCRIPT */

// Display Something
SERVER.get('/',(req,res) => {
	res.send("Hey there ;^)");
});

// Get questions
SERVER.get('/api/posts',(req,res) => {
	DB.find()
		.then((posts) => {
			console.log("Posts found:/t",posts);
			res.json(posts);
		})
		.catch(err => {
			res
				.status(500)
				.json({message: "Failed to locate 'Posts'"});
		})
});

// Get question Id's
SERVER.get('/api/posts:id',(req,res) => {
	DB.find()
		.then((posts) => {
			console.log("Post:\t",posts)
			res.json(posts)
		})
		.catch(err => {
			res
				.status(500)
				.json({message: "Failed to find post ID"})
		})
});

// Use POST

SERVER.post('api/posts',(req,res) => {
	const Post = req.body;
	if(Post.title && Post.content){
		DB.insert(Post).then(idInfo => {
			DB.findById(idInfo.id).then(user => {
				res.status(201).json(Post);
			});
		}).catch(err => {
			res
				.status(500)
				.json({message: "Failed to post"})
		});
	} else {
		res
			.status(400)
			.json({message: "Missing title or content"})
	}
});

// Use DELETE

SERVER.delete('api/posts:id',(req,res) => {
	const {id} = req.params;
	DB.remove(id).then(count => {
		if(count){
			res.json({message: `Deleted ${count}`})
		} else {
			res
				.status(404)
				.json({message: "Invalid id"})
		}
	}).catch(err => {
		res
			.status(500)
			.json({message:"Failed to delete"})
	})
});

// Start Listenings
SERVER.listen(PORT, () => {
	console.log("Listening on port:\t",PORT);
});
