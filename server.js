const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./data/db.js');
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from Express'));

app.listen(port, () => console.log(`Server is listening on PORT: ${ port }`));