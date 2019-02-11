// PROJECTS ROUTE HANDLERS
const express = require('express');
const router = express.Router();
const projectsDb = require('../data/helpers/projectModel.js');

router.route('/')
  .post((req, res) => {
    const { name, description, completed } = req.body;
    const newProject = { name, description, completed: completed || false } ;
    if (!name) return res.status(400).json({ error: "Please provide a project name."});
    if (!description) return res.status(400).json({ error: "Please provide a project description."});
    projectsDb.insert(newProject)
      .then(newProject => res.status(201).json(newProject))
      .catch(err => res.status(500).json({ error: "There was an error while saving the project to the database" }));
  })
  .get((req, res) => {
    projectsDb.get()
      .then(projects => res.status(200).json(projects))
      .catch(err => res.status(500).json({ error: "The request for projects could not be retrieved." }));
  })

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    projectsDb.get(id)
      .then(project => {
        if (!project) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(200).json(project);
      })
      .catch(err => res.status(500).json({ error: "The project information could not be retrieved." }));
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const editedProject = { name, description, completed };
    projectsDb.update(id, editedProject)
      .then(updatedProject => {
        if (!updatedProject) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(200).json(updatedProject);
      })
      .catch(err => res.status(500).json({ error: "The project information could not be modified." }));
  })
  .delete((req,res) => {
    const { id } = req.params;
    projectsDb.remove(id)
      .then(removedProject => {
        if (!removedProject) return res.status(404).json({ error: "The project with the specified ID does not exist." });
        return res.status(202).json(removedProject);
      })
      .catch(err => res.status(500).json({ error: "The project could not be removed." }));
  })

  router.route('/:id/actions')
    .get((req, res) => {
      const { id } = req.params;
      projectsDb.getProjectActions(id)
        .then(allActions => {
          if (!allActions.length) return res.status(404).json({ error: "The actions of the project with the specified ID does not exist."});
          return res.status(200).json(allActions);
        })
        .catch(err => res.status(500).json({ error: "The actions of the projects could not be retrieved" }));
    })

module.exports = router;
