const evnReader = require("dotenv")
evnReader.config(); //reads the .env file and merges it into process.env

const server = require("./server")

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
