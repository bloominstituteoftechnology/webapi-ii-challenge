
const express = require ('express')

//import hubs db helper functions
const Hubs = require('../db.js');

//initialize router
const router = express.Router();

//get all hubs
router.get('/', async (req, res) => {
    try {
      const hubs = await Hubs.find(req.query);
      res.status(200).json(hubs);
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
      const hub = await findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
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
      const hub = await Hubs.add(req.body);
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
      const count = await Hubs.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'The post could not be removed',
      });
    }
  });
  
  //edit a hub
  router.put('/:id', async (req, res) => {
    try {
      const hub = await Hubs.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
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