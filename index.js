const express = require("express");
const db = require("./data/db.js");

const app = express();
const PORT = 3000;

// Endpoints

// Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
