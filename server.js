const express = require('express');
const db = require('./data/db');

const server = express();


server.listen(5000, () => {
    console.log("It's fucking going down on port 5000!");
})


