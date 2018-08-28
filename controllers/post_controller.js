'use strict' 

const db = require('../data/db.js');

exports.getPosts = async (req, res) => {
    try {
        const posts = await db.find() // res
        res.status(200).json(posts)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    }
    
}

exports.getPostByID = async (req, res) => {
    try{
        const post = await db.findById(req.params.id)
        res.status(200).json(post)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved." })
    }
}

exports.addPost = async (req, res) => {
    try {
        const data = req.body
        if (data.title !== undefined && data.contents !== undefined){
            await db.insert(data)
            res.status(201).json({success: true})
        }else 
            res.status(400).json( { errorMessage: "Please provide title and contents for the post." })
    }catch(err){
        console.log(err)
        res.status(500).json({ error: "There was a problem while saving the post to database."})
    }
}


exports.deletePost = async (req, res) => {
    try{
        await db.remove(req.params.id)
        res.status(200).json({success: true})
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: "The post could not be removed" })
    }
}

exports.updatePost = async (req, res) => {
    try { 
        const updatedPost = await db.update(req.params.id, req.body)
        res.status(200).json(updatedPost)
    }catch(err){
        console.log(err)
        res.status(500).json({ error: "The post information could not be modified." })
    }
}