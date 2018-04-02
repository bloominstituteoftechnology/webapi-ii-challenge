// import your node modules
const express =require ('express');
const db = require('./data/db.js');
const server = express();
server.get('/', function(req, res) {res.send ('Api is running');
});
// add your server code starting here
//find 
server.get('/api/posts', (req, res) => {
db
.find()
.then (posts => {
	res
.status(500)
.json({error: ' The post information could not be found'})
})
//.catch(error => {
//	res.status(500).json (error);
});
/*
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

// insert



// update isn't right

server.put ('/api/posts/:id', (req, res)=> {
const { id } req.params;
db
update('id', Number(id))
then ( posts => {
	res.json ('id', )
});
});

*/

server.delete ('/api/posts/:id', (req, res) => {
const { id } = req.params;
db
.remove(id)
.then (posts => {
	res.json (posts [0]);
})
.catch(error => {
	res.status(500).json (error);
    console.log('The post could not be removed');
});
});
	







const port= 5000;
server.listen(port, () => 
	console.log('Api running on Port 5000'));
