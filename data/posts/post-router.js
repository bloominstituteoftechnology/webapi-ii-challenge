const router = require('express')

const db = require('../db');

const router = express.Router();

router.get('/', async (req, res)=> {
    try {
        const posts = await db.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "The posts information could not be retrieved."});
    }
});


router.get('/:id', async (req, res) => {
    try {
      const db = await db.findById(req.params.id);

      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    }
  });


module.exports = router;