const express = require("express");
const userRouter = require("./routes/users-routes");

const server = express();
server.user(express.json());
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
    res.send("server is running!");
})

const port = 2019;
server.listen(port, () => console.log(``))