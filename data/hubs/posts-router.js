
const express = require ('express')

//import hubs db helper functions
const Hubs = require('../db.js');

//initialize router
const router = express.Router();

//get all hubs
router.get('/', async (req, res) => {
    try {
      const posts = await find(req.query);
      res.status(200).json(posts);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The posts information could not be retrieved.',
      });
    }
  });


  //get hubs by id
  router.get('/:id', async (req, res) => {
    try {
      const post = await findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be retrieved.',
      });
    }
  });
  
  //add a hub
  router.post('/', async (req, res) => {
    try {
      const post = await add(req.body);
      if(){

      } //add more
      else{
          
      }
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'There was an error while saving the post to the database',
      });
    }
  });
  
  //delete a hub
  router.delete('/:id', async (req, res) => {
    try {
      const count = await remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'Yay' });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be retrieved.',
      });
    }
  });
  
  //edit a hub
  router.put('/:id', async (req, res) => {
    try {
      const post = await update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post information could not be modified.',
      });
    }
  });

  //Sub Routes

  

  module.exports = router;