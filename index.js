const express = require("express");
const userRouter = require("./routes/users-routes");

const server = express();
server.use(express.json());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>server is running!</h2>
    <p>Welcome to Lambda Users </p>`);
});

const port = 2019;
server.listen(port, () => console.log(`Listening on port ${port}`));
