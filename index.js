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
			console.log("Post ID:\t",posts)
			res.json(posts)
		})
		.catch(err => {
			res
				.status(500)
				.json({message: "Failed to find post ID"})
		})
});

// Start Listenings
SERVER.listen(PORT, () => {
	console.log("Listening on port:\t",PORT);
});
