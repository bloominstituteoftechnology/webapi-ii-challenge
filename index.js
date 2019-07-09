const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const postRouter = require("./routes/post-router");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts", postRouter);

const port = 8080;

app.listen(port, (req, res) => {
  console.log(`\n:::Server running on port ${port}:::\n`);
});
