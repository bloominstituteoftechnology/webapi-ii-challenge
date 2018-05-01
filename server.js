// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(express.json());

server.get('/', (req,res)=>{
res.send('API IS APIE')
})

server.get('/posts', (req, res)=>{
    db
    .find()
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(500).json({error: "geting fail"});
    });
});
server.get('/posts/:Id', (req, res)=>{
const {id} = req.params;
    db
    .fndById(id)
    .then(posts =>{
        res.json(posts);

    })
    .catch(err=>{
        res.status(400).json({error: "getting by id fail"});
    });
});
server.post('/posts', (req, res)=>{
  const post = req.body;
  console.log(req.body)
    db
    .insert(post)
    .then(response =>{
        db.findById(response.id)
        .then(post =>{
            res.json(post)
        }     
        )
    })
    .catch(err=>{
        res.status(400).json({error: "Please provide name and bio for the user."});
    });
});
server.put('/posts/:id', (req, res)=>{
    const { id } = req.params
    const update = req.body;
    db
    .update(id, update)
    .then(count =>{

        if(count > 0){
            db
            .findById(id)
            .then(posts =>{
            
                res
                .status(200)
                .json(posts[0]);
            })
        } else{
            res.status(400)
            .json({message:"this post does not exist"})
        }
    })
    .catch(err=>{
        res.status(400).json({error: "There was an error while saving the user to the database"});
    });
});

server.delete('/posts/:id', (req, res)=>{
    const { id } = req.params
    let post;
    db
        .findById(id)
        .then(foundPost =>{
           
            post ={ ...foundPost[0] }
      db
      .remove(id)
      .then(response => {
            res.status(200).json(post);
        })
          })
         .catch(err =>{
           res.status(500).json({error:"this darn error"});    
         }); 
});

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));

