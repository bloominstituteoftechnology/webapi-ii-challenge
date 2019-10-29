const router = require('express').Router();

const db = require('../data/db.js')

router.get('/', (req, res) => {
     const query = req.query;

     db.find(query)
     .then(item => {
          res.status(200).json(item)
     })
     .catch(error => {
          console.log(error)
          res.status(500).json({
               message: "Error retrieving items"
          })
     })
})



module.exports = router;


/*
TODO: NOTES
* POST 

* POST 

* GET 

* GET 

* GET 

* DELETE

* PUT 

*/