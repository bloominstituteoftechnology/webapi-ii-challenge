const router = require('express').Router();
const Data = require('../data/db');

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  console.log('id from comments',id)
  Data.findPostComments(id)
  // .first()
  .then(comment => {
    res.status(200).json(comment)
  })
  .catch(error => {
    res.status(500).json({ message: "The comments information could not be retrieved." })
  })
})




module.exports = router
