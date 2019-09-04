const express = require('express'); //import express;
const server = express();

const port = 4000;
server.listen(port, () => console.log(`API on port ${port}`));
