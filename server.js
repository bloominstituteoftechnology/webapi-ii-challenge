// import your node modules
const express =require ('express');
const db = require('./data/db.js');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');

server.use(express.json());
server.use(morgan ('dev'));
server.use(helmet ());


server.get('/', function(req, res) {res.send ('Api is running');
});


 //add your server code starting here
//find 
server.get('/api/posts', (req, res) => {
db
.find()
.then (posts => {
	res
.status(500)
.json({error: ' The post information could not be found'})
})

});

//find by Id
server.get ('/api/posts/:id', (req, res) => {
const { id } = req.params;
db
.findById(id)
.then (posts => {
	res.json (users [0]);
})
.catch(error => {
	res.status(500).json (error);
});
});

// insert should be ok. 500 error
server.post('/api/posts', function (req, res) {
	const post =req.body;
	db
	insert(user) .then(response => {
		res.status(201).json(response)
	})
	.catch(error => {
		res
			.status(500)
			.json({error: "There was an error while saving the post to the database"})
	});
	});

/*

// update isn't right d
// crashes the server

server.put ('/api/posts/:id', (req, res)=> {
const { id } req.params;
const update = req.body;
db
.update(id, update)
.then ( count => {
 if(count > 0 ) {
db
.findById(id) .then(udpdated => {
	res.status(200).json (updatedPost);
})
} else {
	res.status(404).json ({'The post with the specified ID does not exist.'})
}
})
.catch(error => {
	res.status(500)
	.json({ error: "The post information could not be retrieved." })
});
});


//delete  both deletes crash the server
const { id } =req.params;
if(!id) {
	res.status(404).json ({
	message: "The post with the specified ID does not exist." }
	});
}
db
.remove(id) .catch(error => {
	res.status(500).json ({ error: "The post with the specified ID does not exist." });
}
db
.remove(id)
.then(() => {
	res.json({message: 'Success'});


});
});

server.delete ('/api/posts/:id', (req, res) => {
const { id } = req.params;
let post
.findById(id)
.then(response => {
	post = {...response[0];
db
.remove(id)
.then (response => {
	res.json(200).json(response);
})

.catch(error => {
	res
	.status(500)
	.json({error:"The post could not be removed" })

});
};
	
*/






const port= 5000;
server.listen(port, () => 
	console.log('Api running on Port 5000'));
