// import your node modules
const express = require('express'); //  to import the express module and make it available to our application
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express(); // creates our Express application
const port = 3000;
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => { // two arguments (the homies): an object that represents the request and another object that represents the response
    res.send('Hello World');
  });

server.get('/posts', (req, res) => {
    const postsArray = [
        {
          title:
            'I wish the ring had never come to me. I wish none of this had happened.',
          contents: 'Guess who said this',
        },
        {
          title: 'I think we should get off the road. Get off the road! Quick!',
          contents: 'Guess who said this',
        },
        {
          title:
            "I made a promise, Mr Frodo. A promise. \"Don't you leave him Samwise Gamgee.\" And I don't mean to. I don't mean to.",
          contents: 'Guess who said this',
        },
        {
          title:
            " N-nothing important. That is, I heard a great deal about a ring, a Dark Lord, and something about the end of the world, but... Please, Mr. Gandalf, sir, don't hurt me. Don't turn me into anything... unnatural.",
          contents: 'Guess who said this',
        },
        {
          title:
            'You need people of intelligence on this sort of mission...quest...thing.',
          contents: 'Guess who said this',
        },
        {
          title:
            'All you have to do is decide what to do with the time that is given to you.',
          contents: 'Guess who said this',
        },
        {
          title:
            'Do not be so quick to deal out death and judgement. Even the very wise do not see all ends.',
          contents: 'Guess who said this',
        },
        {
          title:
            ' Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
          contents: 'Guess who said this',
        },
        {
          title:
            'I will be dead before I see the ring in the hands of an elf! Never trust an elf!',
          contents: 'Guess who said this',
        },
      ]
    res.status(200).json(postsArray);
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
});

  server.listen(port, () => console.log(`Server is listening to port ${port}`)); // Our server will only send a response to GET requests made to the / route on port 3000
