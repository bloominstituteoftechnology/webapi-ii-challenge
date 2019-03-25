const server = require("./server");
const db = require("./data/db");

server.get("/api/posts", (req, res) => {
	db.find()
		.then(posts => res.status(200).json(posts))
		.catch(err =>
			res.status(500).json({
				messsege: `cannot retrieve list`
			})
		);
});

server.get("/api/posts/:id", (req, res) => {
	const { id } = req.params;
	db.findById(id).then(user => res.status(200).json(user))
	.catch(err => res.status(500).json({ messege: `Cannot find user` }))
});

server.delete('/api/posts/:id', (req, res) => {
	const { id } = req.params;
	db.remove(id).then(user => res.status(201).json( {messege: 'User Deleted'} ))
	.catch(err => res.status(500).json( {messege: 'user could not be deleted'} ))
});

server.post('/api/posts/', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		sendUserError(400, `need title & contents`, res);
		return;
	} else {
	db.insert({ title, contents }).then(user => res.status(200).json({ messege: 'user added' }))
	.catch(err => res.status(500).json({ messege: `user could not be added` }));
}
});

const port = 4000;

server.listen(port, () => console.log(`server rolling on port ${port}`));
