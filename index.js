const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

// BEGINNING OF END POINTS

server.get('/', (req, res) => {
    res.status(200).json('hello from server!')
})

// END OF END POINTS

server.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT || 3000}`)
})