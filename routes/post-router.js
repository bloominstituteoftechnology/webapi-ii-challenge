const express =  require('express');
const router = express.Router();
const db = require('./../data/db');

router.get('/', async (req, res) => {
  
  try {
    post = await db.find(req.query);
    res.status(200).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Hub not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});

router.post('/', async (req, res) => {
  try {

    const post = await db.insert(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the hub',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content =await db.findById(req.params.id)
    const post = await db.remove(req.params.id);
    
    if (post > 0) {
      res.status(200).json({ message: content});
    } else {
      res.status(404).json({ message: 'The hub could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the hub',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await db.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(req.body);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});
// use ctrl+d to highlight and change multiple items with the same name.

module.exports = router;