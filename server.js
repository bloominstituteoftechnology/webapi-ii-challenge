// import your node modules
const express = require('express');

// add your server code starting here

const server = express();
server.use(express.json());

const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send('API Running');
});

server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.json(posts);
  }).catch(err => {
    res.status(500).json({error: "The posts information could not be retrieved"});
  })

})

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id).then(post => {
    if (post.length === 0) {
      res.status(404).json({message: "Not Found"})
    } else {
      res.json(post);
    }
  }).catch(err => {
    res.status(500).json({message: "The post with the specified ID does not exist."});
  })
})

server.post('/api/posts', (req, res) => {
  const post = req.body;
  // console.log(req.body);
  db.insert(post).then(post => {
    res.json(post);
  }).catch(err => {
    res.status(400).json({message: "Please provide title and contents for the post."})
    // console.log(err);
  })
})

server.delete('/api/posts/:id', function(req, res) {
  const id = req.params.id;
  let user;
  db.findById(id).then(posts => {
    user = {
      ...posts[0]
    };
    db.remove(id).then(response => {
      if (response) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."});
      }
    })
  }).catch(err => {
    res.status(500).json({error: "The post information could not be retrieved."});
  });
});


server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  db.update(id, req.body)
  .then(isPresent => {
    (!req.body.title || !req.body.contents) ? res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    : isPresent ? res.status(200).json(req.body)
    : res.status(404).json({ message: "The post with the specified ID does not exist." });
  })
  .catch(error => {
    res.status(500).json({ error: "The post information could not be modified." });
  });
});
server.listen(3000);









// server.put('/api/posts/:id', (req, res) => {
//   const { id } = req.params;
//   const { title, contents } = req.body;
//
//
//     if (!title || !contents) {
//       res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
//     }
//     db.update(id, req.body)
//
//     .then(isPresent => {
//       console.log(isPresent)// giving only 1 if present , 0 if not
//       if (isPresent) {
//         res.status(200).json(req.body);
//       } else {
//         res.status(404).json({ message: "The post with the specified ID does not exist." })
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ error: "The post information could not be modified." });
//     });
//   });






//     server.put('/api/posts/:id', (req, res) => {
//     const id = req.params.id;
//     const title = req.body.title;
//     const contents = req.body.contents;
//
//     db
//     .update(id, req.body)
//     .then(response => {
//         if(response) {
//             if (!title || !contents) {
//                 res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
//             }
//             res.status(200).json(req.body);
//         }
//         else {
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ error: "The post information could not be modified." })
//     })
// })
