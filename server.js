//where our server will be created


const express=require("express");
const cors = require("cors")

const server=express();

const PostRouter=require("./router.js")
server.use(express.json());
server.use(cors())
server.use("/api/posts",PostRouter)



module.exports = server;






