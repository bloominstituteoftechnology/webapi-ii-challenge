const express = require('express');
const db = require('./data/db');

const router = express.Router();


//GET request
router.get('/', async(req, res) => {
    try{
        const users = await db.find(req.query);
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
})

//GET by id
router.get('/:id', async(req, res) => {
    try{
        const user = await db.findById(req.params.id)
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    } catch {
        res.status(500).json({
            message:'Error retrieving the user'
        })
    }
})

//POST 
router.post('/', async (req, res) => {
    const newUser = req.body
    const {title, contents} = req.body;

    if( title && contents) {
        try{
            const addUser = await db.insert(newUser);
            res.status(201).json(addUser);
        } catch(err) {
            res.status(500).json({message: "There was an error while saving the post to the database"})
        }
    } else {
        res.status(400).json({errorMessage:  "Please provide title and contents for the post."})
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const  remove = await db.remove(req.params.id);
        if(remove > 0 ) {
            res.status(200).json({message: 'The user has been destroyed'})
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } 
    } catch(error) {
        res.status(500).json({message: "The post could not be removed"})
    }
})

//PUT
router.put('/:id', async (req, res) => {
    const editUser = req.body;
    const {title, contents} = req.body;

    if(title && contents) {
    try {
        const updateUser = await db.update(req.params.id, editUser);
        if(updateUser) {
            res.status(200).json(updateUser)
        } else {
            res.status(404).json({ messsage: "The post with the specified ID does not exist"})
        }
    } catch(err) {
        res.status(500).json({ error: "The post information could not be modified." })
    }
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})

module.exports = router;