// import your node modules
const express = require('express');
 const cors = require('cors');

const db = require('./data/db.js');
// add your server code starting here

const port = 5000;

const server = express();
server.use(express.json());

server.use(cors({origin: 'http://localhost:3000'}));

server.get('/', (req, res) => {
    //1st arg: route where a resource can be interacted with
    // 2nd arg: callback to deal with sending reponse, and handling incoming
    res.send('Hello from response');
})

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body; 
    if(!title || !contents) { 
        res.status(400).json({message: "Please provide title and contents for the post."});
        return;
    }
   db.insert({ title, contents})
   .then(response => {
      db.findById(response.id)
       .then(response => {
           res.status(201).json(response);
       })    
   })
   .catch(error => {
       res.status(500).json({message: `There was an error while saving the user to the database/n Error message: ${error}`});
   });
});

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(users => {
     res.json({users});
    })
    .catch(error => {
        res.status(500).json({error: `The posts information could not be retrieved. Error: ${error}`});
    });
});

server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
     db
     .findById(id)
     .then(response => {
         if(response.length <= 0) {
             res.status(404).json({message: `The post with the specified ID ${id} does not exist.`})
         }
         else {
         res.json({response});
         }
     })
     .catch(error => {
         res.status(500).json({message: `The post information could not be retrieved./n Error message: ${error}`});
     });
});

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const {title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})             
    }
     db
     .update(id, {title, contents})
     .then(response => {
         if(response === 0 ) { 
         res.status(404).json({ message: "The post with the specified ID does not exist." });
         } 
         db
         .findById(id)
         .then(response => {
             res.json({response});
         })
     })
     .catch(error => {
         res.status(500).json({message: `The post information could not be modified/n Error message: ${error}`});
     });
});

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .remove(id)
    .then( response => {
     if(response === 1) {
        res.json({message: `post with id ${id} was removed from database`});
     } else if(response === 0) {
         res.status(404).json({message: "The post with the specified ID does not exist."})
     }
    })
    .catch( error => {
        res.status(500).json({message: `The post could not be removed/n Error message: ${error}`});
    });
});


server.listen(port, () => console.log(`Server running on port ${port}`));
