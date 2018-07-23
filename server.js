// import your node modules
const express = require('express'); //  to import the express module and make it available to our application
const server = express(); // creates our Express application

const db = require('./data/db.js');

// add your server code starting here

server.get('/', (req, res) => { // two arguments (the homies): an object that represents the request and another object that represents the response
    res.send('Hello World');
  });

server.get('/posts', (req, res) => {
    const posts = [
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
    res.status(200).json(posts);
});

  server.listen(3000, () => console.log('API running...')); // Our server will only send a response to GET requests made to the / route on port 3000
