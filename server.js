const express = require("express")
const server = express()
const cors = require("cors")
const knex = require("knex")
const dbConfig = require("./knexfile")
const db = knex(dbConfig.development)
server.use(express.json(), cors())

server.get("/", (req, res) => {
    res.status(201).json("Working")
})
server.get("/api/posts", (req, res) => {
db("posts").then(post => {
    res.status(201).json(post)
})
.catch(err =>{
res.status(401).json({err:"Nope, not happening"})
})
})
server.post("/api/posts", (req, res) => {
    const body = req.body
    db("posts").insert(body).then(id => {
        res.status(201).json(id)
    })
    .catch(err =>{
        res.status(401).json({err:"Nope, not happening"})
    })
})
server.get("/api/posts/:id", (req, res) => {
    const {id} = req.params
    db("posts").where({id}).then(id => {
        res.status(201).json(id)
    })
    .catch(err =>{
        res.status(401).json({err:"Nope, not happening"})
    })
})
server.delete("/api/posts/:id", (req, res) => {
    const {id} = req.params
    db("posts").where({id}).del().then(id => {
        res.status(201).json(id)
    })
    .catch(err =>{
        res.status(401).json({err:"Nope, not happening"})
    })
})
server.put("/api/posts/:id", (req, res) => {
    const {id} = req.params
    const body = req.body
    db("posts").where({id}).update(body).then(id => {
        res.status(201).json(id)
    })
    .catch(err =>{
        res.status(401).json({err:"Nope, not happening"})
    })
})
server.get("/api/posts/:id/comments", (req, res) => {
    const {id} = req.params
    
    db("comments").where({id}).then(id => {
        res.status(201).json(id)
    })
    .catch(err =>{
        res.status(401).json({err:"Nope, not happening"})
    })
})
server.post("/api/posts/:id/comments", (req, res) => {
    const {id} = req.params
    const body = req.body
    db("comments").insert(body).then(id => {
        res.status(201).json(id)
    })
    .catch(err =>{
        res.status(401).json({err:"Nope, not happening"})
    })
})

module.exports=server