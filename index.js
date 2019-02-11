// IMPORTS
const express = require('express');
const projectsRoutes = require('./projectsRoutes/projectsRoutes.js');
const actionsRoutes = require('./actionsRoutes/actionsRoutes.js');
const port = 8000;

// SETUP
const server = express();
server.use(express.json());

// ROUTE HANDLERS
server.use('/projects', projectsRoutes);
server.use('/actions', actionsRoutes);

// PORT LISTENERS
server.listen(port, () => console.log(`===${port} is online!===`))
