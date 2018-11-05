//get posts
//


const db = require('./data/db.js');
const getPosts = (req, res) => {
  db.find()
    .then(posts => {
    res.status(200).json(posts);
    })
    .catch(err => {
    res
      .status(500)
      .json({message: 'We failed to get the users', error: err})
    })
    console.log('We sent out posts')

}

module.exports = getPosts
