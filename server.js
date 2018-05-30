const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./data/db.js');
const port = 5000;

app.use(cors());
app.use(express.json());

/********************
** ROUTE: `/posts` **
********************/
app.get('/api/posts', (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }));
});

app.listen(port, () => console.log(`Server is listening on PORT: ${ port }`));