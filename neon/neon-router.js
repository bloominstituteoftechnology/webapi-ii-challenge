const express = require('express')

const Data = require('../data/db')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
       const dub = await Data.insert(req.body);
       if (!title || !contents) {
           res.status(400).json({ 
               message: 'Please provide title and contents for the post.',
           })
           return;
     }
     res.json(dub);
     res.status(201).json(dub);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error while saving the post to the database',
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const dubs = await Data.find(req.body);
        res.status(200).json(dubs);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The posts information could not be retrieved.',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dub = await Data.findById(req.params.id);
        if (!id) {
            res.status(404).json({
                message: `The post with the specified ID, ${id} does not exist.`,
            })
        } res.json(dub);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post information could not be retrieved.',
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const dubs = await Data.remove(req.params.id);
        if (!id) {
            res.status(404).end({
                message: `The post with the specified ID, ${id} does not exist.`,
            })
        } res.json(dubs);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post could not be removed',
        });
    }
});


router.put('./:id', async (req, res) => {
    try {
        const dub = await Data.update(req.params.id, req.body);
        if (!title || !contents) {
            res.status(400).json({
                message: 'Please provide title and contents for the post.',
            })
        } res.json(dub);
        res.status(200).json(Data);
        if (!id) { 
            res.status(404).json({
                message: `The post with the specified Id, ${id} does not exist.`,
            })
        } res.json(dub);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post information could not be modified.',
        });
    } 
});   
   

module.exports = router;