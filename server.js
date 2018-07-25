// import your node modules

//required imports

const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

let nextId = 9;

//GET POSTS
server.get('/api/posts', (req, res)=> {
    let posts = db.find()
    posts.then(response => {
    res.status(200).json(response);
    })
     .catch(err => {
    console.log(err);
    res.status(500).json({err, error: "The posts information could not be retrieved." });
});
});


server.get('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await db.findById(id)
        if (post.length === 0 || post === undefined) {
         res.status(404).json({ message: "The post with the specified ID does not exist." });
        } 
        res.status(200).json(post);

    } catch (err) {
        console.log(err);
          res.status(500).json({ error: "The post information could not be retrieved." });
      }
    });

//POST POSTS
server.post('/api/posts', (req, res) => {
    const post = req.body;
    const title = req.body.title;
    const contents = req.body.contents;
    //if the title or contents are empty
    if (title === (undefined || null || '') || contents === (undefined || null || '')){
    return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    //insert the post into the db
    db.insert(post)
    .then(response=> {
      return res.status(201).json(post)})
    .catch(err=>{
       return res.status(500).json({err, error: "There was an error while saving the post to the database" });
    })
});

server.delete('/api/posts/:id', async (req, res)=> {
    try {
      const id = req.params.id;
      const post = await db.findById(id);
      console.log(post)
      if(post === (null || undefined) || (post.length === 0)){
        return res.status(404).json({ message: "The post with the specified ID does not exist." })
      }else {
          await db.remove(id);
          res.status(200).json({"success":"post deleted successfully"});
      }

    } catch (err) {
      res.status(500).json({ error: "The post could not be removed" });
    }
})

//UPDATE A POST 
server.put('/api/posts/:id', (req, res)=> {

      const id = req.params.id;
      const post = db.findById(id);
      const title = req.body.title ? req.body.title : null;
      const contents = req.body.contents ? req.body.contents : null;
      //checks to see if post exists
       if ((!post) || (post.length === 0)) {
           res.status(404).json({
               message: "The post with the specified ID does not exist."
           })
           //checks to make sure updated contents are not empty
       } else if ((!title || title === null || title === '') || (!contents || contents === null || contents === '')) {
            res.status(400).json({
               errorMessage: "Please provide title and contents for the post."
           })
       } else {

        db.update(id, {title, contents})
        .then(response=> {    
            res.status(200).json({id:id, title:title, contents:contents})
        })    
        
        .catch(err => {
        res.status(500).json({error: "The post information could not be modified." });
        })
     }
})
    



server.listen(8000, () => console.log('API running on port 8000'));
