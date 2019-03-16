const express =  require('express');
const router = express.Router();
const db = require('./../data/db');

router.get('/', async (req, res) => {
  
  try {
    post = await db.find(req.query);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(`{ error: "There was an error while saving the post to the database" }`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json(`{ message: "The post with the specified ID does not exist." }`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`{ error: "The post information could not be retrieved." }`);
  }
});

router.post('/', async (req, res) => {
  try {
    
    const posts = await db.insert(req.body);
    const content =await db.findById(posts.id)
      console.log([content[0].title])
      if (content[0].title && content[0].contents){
    res.status(201).json(req.body);
  }else{
    res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`)
  }
  } catch (error) {
    console.log(error);
    res.status(500).json(`{ error: "There was an error while saving the post to the database" }`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content =await db.findById(req.params.id)
    const post = await db.remove(req.params.id);
    
    if (post > 0) {
      res.status(200).json({ message: content});
    } else {
      res.status(404).json(`{ message: "The post with the specified ID does not exist." }`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`{ error: "The post could not be removed" }`);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await db.update(req.params.id, req.body);
    if (req.body.title && req.body.contents){
  res.status(200).json(req.body);
}else{
  res.status(400).json(`{ errorMessage: "Please provide title and contents for the post." }`)
}
  } catch (error) {
    res.status(500).json(`{ error: "The post information could not be modified." }`);
  }
});

module.exports = router;