// import your node modules
const db = require('./data/db.js');
const express = require('express'); // import the express package
const server = express(); // creates the server
server.use(express.json()); // middleware ---- teaches express how to parse the JSON request body
server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);// assigns a port

//----- POST -----

server.post('/api/posts', async (req, res) => {
    const post;
    const postData = req.body;
    if (postData.title === undefined ||  postData.title === '' || postData.contents === undefined || postData.contents === '' ) {
        const errorMessage = "Please provide title and contents for the post"; 
        res.status(400).json({ errorMessage, error });
        return
    }
    try {
        const postId = await db.insert(postData);
        post = await db.findById(postId.id);
    } catch (error) {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
            return      
    }
    res.status(201).json(post);
  });
  
//----- PUT -----

server.put('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const postChanges = req.body;

  if (postChanges.title === undefined ||  postChanges.title === '' || postChanges.contents === undefined || postChanges.contents === '' ) {
    const errorMessage = "Please provide title and contents for the post"; 
    res.status(400).json({ errorMessage, error });
    return
}
  try {
        await db.update(id, postChanges);
    } catch (error) {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
      return      
  }
    res.status(201).json(post);
  });
  

//----- DELETE -----

server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
        .then(post => {
        if (post && post.length) {
         res.status(200).json(post);
        } else { // or oops - if we could retrieve it, we would but it's not here, status 404
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
        .catch(err => {
         res.status(500).json({ error: "The post could not be removed" });
        });
      });
      

//----- GET -----

server.get('/api/posts', (req, res) => {
    db.find() //calling find method from db.js file 
      .then(posts=> { 
        res.status(200).json(posts);
      }) // once you find them- communicated by 200 status code, display them
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });//if you 'catch' an error as defined by status 500 - let the client know
  });

//----- GET -----

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params; //pull the id off the request 
    db.findById(id) //call findbyid method, passing in id from above
      .then(post => { //then check for ...
        if (post && post.length) { // status 200 - we found it!
          res.status(200).json(post);
        } else { // or oops - if we could retrieve it, we would but it's not here, status 404
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res //if data can't be retrieved ... 
          .status(500)
          .json({ error: "The post information could not be retrieved." });
      });
  });
/*

*/
