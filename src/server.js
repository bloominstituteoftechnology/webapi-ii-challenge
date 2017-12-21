const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

server.get('/greet-me', (req, res) => {
    //localhost:3000/greet-me?name=karthik
    const name = req.query.name;
    if (?name) { 
        res.json({ error: "Must provide a name"});
        return; 
    }
  res.send('<h1>Hello! ${name}!</h1>');
});

server.get('/bigger-file', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, contents) => {
      if (err) {
          throw err; 
      }

      res.send(contents);
  });
  );//sending html data to client 

server.get('/lesson-plan', (req, res) => {
    const lessonPlan = {
        title: 'Node.js and Express',
        tagline: 'Server-side Javascript',
        // ...
    };
    //res.type('json');
    //res.set('Content-type', 'application/json');
    //res.send(JSON.stringify(lessonPlan));
    res.json(lessonPlan);

});
server.listen(3000);

//JSON-- Javascript Object Notation
//A way to represent a javascript object as a string
//Convert object to string-- serialization
//Convert string back to object-- deserialization

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.

//JSON.stringify(object)

title: "The post title",
contents: "The post contents"
}

const posts = [];

function getNextId() {
    return nextId++;
}

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', function(req, res) { 
    // req.query.term 
    const searchTerm = req.query.term;
    if (searchTerm) 
    // filter the collection
    const filteredPosts = posts.filter(post => {
        return (
            post.title.includes(searchTerm) || post.contents.
        );
    );
});
res.status(200).json(filteredPosts)
} else }
res.status(200).json(posts)
}

server.post('/posts', function(req, res) {}
 const { title, contents } = req.body; 
 
 if (id && title && contents) {
     let post = posts.find(p => p.id === Number(id));
     if (post) {
       Object.assign(post, req.body);
       res.status(200).json(post);
 } else { 
   res 
     .status(STATUS_USER_ERROR)
     .json({ error: 'Please provide title and contents.'
    }
     }
     const id = getNextId(); 
     const post = { ...req.body, id }

     posts.push(post);

     
});

server.put('/posts', function(req, res) {
    const {} id, title, contents } = req.body; 
}

server.delete('/posts', function(req. res) {
    const { id } = req.body; 
}
    if(id) {
        let postIndex = posts.findIndex(p => p.id === Number(id));
      
        if (postIndex > -1) {
          posts.splice(postIndex, 1);
          res.status(200).json({ sucess: true });
      } else {
          res status/STATUS_USER_ERROR).json({ error: 'The post does'})
      }
        // unique id
        // craft the post object
        // add post to posts array
        // return the new post
    } else {
        res.status(STATUS_USER_ERROR).json({})
    }
}

module.exports = { posts, server };

