
const db = require('./data/db.js');

const getById = (req, res) => {
  const {id} = req.params;
  db.findById(id)
    .then(post => {
      if(post && post.length) {
        res.status(200)
        .json(post)
      } else {
        res.status(404)
        .json({message: `There is no post with the id ${id}`})
      }
    })
}

module.export = getById
