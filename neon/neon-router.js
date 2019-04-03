const express = require('express')

const Data = require('../data/db')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        // const postData = req.body;
        const postId = await Data.insert(req.body);
        // const post = await Data.findById(postId.id);
        res.status(201).json(postId);
      } catch (error) {
        let message = "There was an error while saving the post to the database";
    
        if (error.errno === 19) {
          message = "please provide both the title and the contents";
        }
        res.status(500).json({ message: message, error });
      }
})


    // router.post('/', async (req, res) => {
    //     try {
//        const dub = await Data.insert(req.body);
//        if (error.errno===19) { // Use when there is no title or content
//            res.status(400).json({ 
//                message: 'Please provide title and contents for the post.',
//            });
//            return;
//      }
     
//      res.status(201).json(dub);
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error while saving the post to the database',
//         });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const dubs = await Data.find();
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
    const {id} = req.params;
    try {
        const dub = await Data.findById(id);
        if (dub) {
            res.status(200).json(dub)
        } else {
        res.status(404).json({
            message: `The post with the specified ID, ${id} does not exist.`,
        }) 
    }
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
        const dubs = await Data.remove(req.params.id).then(dubs => {
            res.status(200).json(dubs)
        });
        {
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

router.put('/:id', async (req, res) => {
    try {
        const dub = await Data.update(req.params.id, req.body).then(dub => {
            res.status(200).json(dub);
        });
        {
        res.status(200).json(Data);
        if (!id) { 
            res.status(404).json({
                message: `The post with the specified Id, ${id} does not exist.`,
            })
        } res.json(dub);
    }}
    catch (error) {
        console.log(error);
        if (error.errno===19) {
            let message = 'Please provide title and contents for the post.'
        
        res.status(500).json({message: 'The post information could not be modified.'});
    }}
});    
   

module.exports = router;