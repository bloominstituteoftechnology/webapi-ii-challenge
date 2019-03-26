
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
        message: 'Error retrieving the hubs',
      });
    }
  });


  //get hubs by id
  router.get('/:id', async (req, res) => {
    try {
      const hub = await Hubs.findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
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
  
  //add a hub
  router.post('/', async (req, res) => {
    try {
      const hub = await Hubs.add(req.body);
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
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
        message: 'Error removing the hub',
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
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });

  //Sub Routes

  //add endpoint that returns all messages for a hub
  router.get('/:id/messages', async (req, res) =>{

      try{
          const response = await Hubs.findHubMessages(req.params.id)
          if (response && response.length > 0){
              res.status(200).json(response)
          }else{
            res.status(404).json({message: 'No message for the hub'})
          }
      }catch(error){
          res.status(500).json({errorMessage: `Error retrieving messages: ${error}`})
      }
  })


  //add endpoint that adds new message for a hub
  router.post('/:id/messages', async(req,res) =>{
      const messageInfo = {...req.body, hub_id: req.params.id}
      try{
          const response = await Hubs.addMessage(messageInfo)
          res.status(201).json(response)
      }catch(error){
          res.status(500).json({errorMessage: `Error adding meassage: ${error}`})
      }
  })

  module.exports = router;