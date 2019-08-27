require('dotenv').config()

const server = require('./server.js')

const port = process.env.PORT || 6969

server.listen(port, () => {
  console.log(`\n*** Server Running on Port: ${port} ***\n`);
});
