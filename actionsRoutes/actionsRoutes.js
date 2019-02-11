// POSTS ROUTE HANDLERS
const express = require('express');
const router = express.Router();
const projectsDb = require('../data/helpers/projectModel.js');
const actionsDb = require('../data/helpers/actionModel.js');

router.route('/')
  .post((req, res) => {
    const { project_id, description, notes, completed } = req.body;
    const createdAction = { project_id, description, notes, completed: completed || false };
    if (!project_id) return res.status(400).json({ error: "Please provide a project id." });
    if (!description) return res.status(400).json({ error: "Please provide a description." });
    if (description.length > 128) return res.status(422).json({ error: `Please provide a description less than or equal to 128 characters long. (${description.length})` });
    if (!notes) return res.status(400).json({ error: "Please provide notes." });
    projectsDb.get(project_id)
      .then(project => {
        actionsDb.insert(createdAction)
          .then(newAction => res.status(201).json(newAction))
          .catch(err => res.status(500).json({ error: "There was an error while saving the action to the database." }));
      })
      .catch(err => res.status(500).json({ error: "The project with the specified ID does not exist." }));
  })
  .get((req, res) => {
    actionsDb.get()
      .then(actions => res.status(200).json(actions))
      .catch(err => res.status(500).json({ error: "The request for actions could not be retrieved" }));
  })

router.route('/:id')
  .put((req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    const editedAction = { project_id, description, notes, completed: completed || false };
    actionsDb.update(id, editedAction)
    .then(updatedAction => {
        if (!updatedAction) return res.status(404).json({ error: "The action with the specified ID does not exist." });
        return res.status(202).json(updatedAction);
      })
      .catch(err => res.status(400).json({ error: "The action information could not be modified" }));
  })
  .delete((req, res) => {
    const { id } = req.params;
    actionsDb.remove(id)
      .then(removedAction => {
        if (!removedAction) return res.status(404).json({ error: "The action with the specified ID does not exist." });
        return res.status(202).json(removedAction);
      })
      .catch(err => res.status(500).json({ error: "The action could not be removed." }));
  })

  module.exports = router;
