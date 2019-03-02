const express = require("express");
const server = express();
server.use(express.json());
const cors = require("cors");

const PORT = 8000;

const postRoutes = require("./routes/postsRoutes");
server.use("/api/posts", postRoutes);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
