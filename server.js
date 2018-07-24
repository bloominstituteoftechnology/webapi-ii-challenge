// import your node modules
const express = require('express');
const db = require('./data/db.js');


// add your server code starting here
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello World');
  });

  server.get('/api/posts', (req, res) => {
    //res.end
    // try{
    //   const users = await db.find();
    //   res.status(200).json(users);
    // }catch(err){res.status(500)
        //.json({error:"we have error"})

    // }
      db.find()
      .then(posts=>{
        res.status(200).json(posts);
      })
      .catch(error =>{
        res.status(500)
        .json({error:"The posts information could not be retrieved."})
      })
      
    

  });
  server.get('/api/posts/:id', (req, res) => {
     db.findById(req.params.id)
     .then(posts=>{
       res.status(200).json(posts)
     })
     .catch(error =>{
      res.status(500)
      .json({error:"The post with the specified ID does not exist."})
    })
    
});
server.post('/api/posts', (req, res) => {
  // const post = {id:nextId++, name: "sam"};
  // posts.push(post);
  // res.status(200).json(posts);
  db.insert(req.params.title)
  .then(posts=>{
    res.status(200).json(posts)
})
});

server.delete('/api/posts/:id', (req, res) => {
// const {id} = req.params;
// posts = posts.filter(p => p.id != id)
db.remove(req.params.id)
     .then(posts=>{
       res.status(200).json(posts)
})
});

server.put('/api/posts/:id', (req, res) => {
  // const {id} = req.params;
  // posts = posts.filter(p => p.id != id)
  db.update(req.params.id, req.body)
       .then(posts=>{
         res.status(200).json(posts)
  })
  });


  server.listen(9000, () => console.log('API running on port 9000'));

  // db.insert()
  // .then(posts=>{
  //   res.status(200).json(posts);
  // })
  // .catch(error =>{
  //   res.status(500)
  //   .json({error:"we have error"})
  