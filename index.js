const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json('API UP');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
