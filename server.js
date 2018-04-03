// import your node modules
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');

const db = require('./data/db.js');

const server = express();


server.use(morgan('dev'));
server.use(helmet());
server.use(bodyParser.json());

server.use(cors());
// add your server code starting here

const sendUserError = (msg, res) => {
    res.status(422);
    res.json({ Error: msg });
    return;
  };

server.get('/', (req, res)=>{
    res.json({api: 'Running....'});
});
// ********************************************Get URL***************************************
// When the client makes a `GET` request to `/api/posts`:
//   * If there's an error in retrieving the _posts_ from the database:
//   * cancel the request.
//   * respond with HTTP status code `500`.
//   * return the following JSON object: `{ error: "The posts information could not be retrieved." }`.

server.get('/api/posts', (req, res)=> {
    db
    .find()
    .then (posts=> {
        res.json(posts);
    })
    .catch(error=> {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

// ************************************************Get with ID*********************************
// When the client makes a `GET` request to `/api/posts/:id`:
//   * If the _post_ with the specified `id` is not found:
//   * return HTTP status code `404` (Not Found).
//   * return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
//   * If there's an error in retrieving the _post_ from the database:
//   * cancel the request.
//   * respond with HTTP status code `500`.
//   * return the following JSON object: `{ error: "The post information could not be retrieved." }`.

server.get('/api/posts/:id', (req, res)=> {
        const { id } = req.params;
        // const post= req.body;
        db
        .findById(id)
        .then(posts =>{
            if(posts.length > 0){
                res.status(200)
                res.json(posts)
            } else {
                res
                .status(404)
                .json({message:"The user with the speicifed ID does not exist"});
            }
        })
        .catch(error => {
            res.status(500).json({message: "server error" });
        });
        
    })
// ***************************************Post*****************************************************
// When the client makes a `POST` request to `/api/posts`:

//   * If the request body is missing the `title` or `contents` property:
//   * cancel the request.
//   * respond with HTTP status code `400` (Bad Request).
//   * return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

//   * If the information about the _post_ is valid:
//   * save the new _post_ the the database.
//   * return HTTP status code `201` (Created).
//   * return the newly created _post_.

//   * If there's an error while saving the _post_:
//   * cancel the request.
//   * respond with HTTP status code `500` (Server Error).
//   * return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.

server.post('/api/posts', (req, res)=> {
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400)
        .json({errorMessage: "Please provide title and contents for the post."})
        return} else {
        const post = req.body;
        db
            
            .insert(post)
            .then (response=> {
                res.json(post);
                res.status(201).json(posts)
            })
            .catch(error =>{
                res.status(500);
                res.json({error:'There was Error while saving into the database'});
            });
        
        }})

//***********************************************Delete*****************************************
// When the client makes a `DELETE` request to `/api/posts/:id`:
//   * If the _post_ with the specified `id` is not found:
//   * return HTTP status code `404` (Not Found).
//   * return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

//   * If there's an error in removing the _post_ from the database:
//   * cancel the request.
//   * respond with HTTP status code `500`.
//   * return the following JSON object: `{ error: "The post could not be removed" }`.

server.delete('/api/posts/:id', (req,res)=> {
    const {id} = req.params;
    let user;
    
    db
    .findById(id)
    .then (response=> {
        user = {...response[0]}
       
        db
        .remove(id)
        .then (response=>{
            if(response.length > 0)
                res.status(200)
                res.json(user);
            })
        .catch(error=>{
            res.status(500)
            .json(error);})
        })
    .catch(error =>{
        res.status(500).json(error);
    });
    
});

//****************************************PUT***************************************************** 
// When the client makes a `PUT` request to `/api/posts/:id`:
//   * If the _post_ with the specified `id` is not found:
//   * return HTTP status code `404` (Not Found).
//   * return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// * If the request body is missing the `title` or `contents` property:
//   * cancel the request.
//   * respond with HTTP status code `400` (Bad Request).
//   * return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

// * If there's an error when updating the _post_:
//   * cancel the request.
//   * respond with HTTP status code `500`.
//   * return the following JSON object: `{ error: "The post information could not be modified." }`.

// * If the post is found and the new information is valid:
//   * update the post document in the database using the new information sent in the `reques body`.
//   * return HTTP status code `200` (OK).
//   * return the newly updated _post_.

server.put('/api/posts/:id', (req,res)=>{
    const { id } = req.params;
    const post =  req.body;

    const {title, contents} = req.body;
    if(!title || !contents) res.status(400).json({errorMessage: "Please provide title and contents for the post."}); return
        db
        .update(id, post)
        .then (count=> {
            if(count> 0){
                db.findById(id).then(updatedUsers=>{
                res.status(200).json(updatedUsers[0]);
                });
            }else{
                res
                .status(404)
                .json({message:'The user with the specified ID does not exist '});
        }
  
    })
    
    .catch(error=>{
        res.status(500).json(error);
    })
});

const port = 5000;
server.listen(port, () => console.log('API runnning on port 5000'));