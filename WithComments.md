// this is the code with notes from the node lab
const bodyParser = require('body-parser');
const express = require('express');
// requires the extensions I need

const STATUS_USER_ERROR = 422;
// I actually don't know why this is here and not further down?
// are we defining this error? lost and confused and sad

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
  {
    title: 'one',
    contents: 'I was petrified.',
    id: 0
  },
  {
    title: 'two',
    contents: 'Kept thinkin I could never live without you by my side.',
    id: 1
  },
  {
    title: 'three',
    contents: 'Then I spent so many nights just thinking how you done me wrong',
    id: 2
  },
  {
    title: 'four',
    contents: 'And I grew strong, and I learned how to get along!',
    id: 3
  }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// get requests - see array
server.get('/posts', (req, res) {
  res.status(200).json(posts);
})
// what happened here? in english?

server.get('/posts/:term', (req, res) => {
  const post = posts.find(post => post.title.includes(req.params.term) || post.contents.includes(req.params.term));
  res.status(200).json(posts);
});
// I'm not sure I understand why I needed to add params and term to what is essentially the same function as above? Find out why!!

// post requests - to add an entry
server.post('/posts', (req, res) => {
  if (post.title !== undefined && post.contents !== undefined) {
    // if the title and contents aren't undefined? of the new post? isn't that the title and contents of the new post below? ORRRRR we can only post this new thing if it has both the title and contents?

    const newPost ={};
    newPost.id = posts.length,
    newPost.title = post.title;
    newPost.contents = post.contents;
    // arguments for new post
    posts.push(newPost);
    // push the new post to the array of posts

    res.status(200).send(posts);
    // if we get this status go ahead and send the posts
  } else {
    res.status(422).json(errorMissingParam);
    // if we get this status send error message?
  }
});

// alternate way to post?
/* server.post("/posts", function( req, res ) {
 +    if(typeof req.body.title == 'string' && typeof req.body.contents == 'string'){
   // if the title is a string and the contents are a string
 +        let post = {title: req.body.title, contents: req.body.contents, id: posts.length}
 // let the post have title, contents, id
 +        posts.push(post);
 // push the new post to the array of posts
  
 +        res.status(200).json(post);
 // if we get this status, send the posts to user
 +    } else {
 +        res.status(503).json({ error: "POST: missing title and/or body"});
 // otherwise we get that status and return the error message
 // how TF do I know what error message it will be? LOOK UP
 +    }
 +}); */

// put requests - update existing posts

server.put('/posts', (req, res) => {
  if(post.id !== undefined && post.title !== undefined && post.contents !== undefined) {
    // if we know ALL of the arguments for this post
    const targetIndex = posts.findIndex(item => item.id === post.id);
    // then this index will be the index of our updeated post
    if(targetIndex !== -1) {
      // as long as zero or greater - meaning as long as the post exists?
      posts[targetIndex].title = post.title;
      posts[targetIndex].contents = post.contents;
      // the post at this index will get these title and contents

      res.status(200).json(posts);
      //all good
    } else {
      res.status(422).json(errorMissingParam); 
      // you done messed up
  }
});

/* alternate way to put
server.put("/posts", function( req, res ) {
 +    if(typeof req.body.title == 'string' && typeof req.body.contents == 'string' && typeof req.body.id == 'string'){
   // if the title and contents are strings
 +        if(parseInt(req.body.id) && parseInt(req.body.id) <= posts.length){
   // if requested body id does not fall outside the array
 +            let post = {title: req.body.title, contents: req.body.contents, id: req.body.id}
  // then let the arguments be whatever user puts
 +            posts[req.body.id] = post;
 // the post at this index in the posts array is the post we are working on
 +            res.status(200).json(post);
 // all good
 +        } else {
 +            console.log(parseInt(req.body.id));
 +            res.status(503).json({ error: "POST: ID not found"});
 // we don't know the id and get an error beyotch.
 +        }
 +    } else {
 +        res.status(503).json({ error: "POST: missing title, body, or ID"});
 // or we don't know any of these params and get this error message beyotch.
 +    }
 +}); */

 // now we finna delete a post
 server.delete('/posts', (req, res) => {
   if(req.params.id && req.params.id <= posts.length) {
     // if the post you want to delete exists in the array - why is req.params.id in here twice?
     posts = posts.splice(req.params.id, 1);
     // take out this part of the array - what is the 1 for?
     res.status(200).json({success: true});
     // all good
   } else {
     res.status(404).json({error: "DELETE: could not find item to be deleted"});
    // naw you messed up
   }
 });

 /* another way to delete
 server.delete('/posts', (req, res) => {
 +  const post = req.body;
 // the post we want to delete is the requested body - clarify what body is?
 +
 +  if (post.id === undefined) {
   if we don't know the id for this post
 +    res.status(422).json(errorMissingParam);
 // we get an error
 +  } else {
 +    const targetIndex = posts.findIndex(item => item.id === post.id);
 // if we know the post id
 +
 +    if (targetIndex === -1) {
   // and it doesn't actually fall within the array
 +      res.status(422).json(errorMissingParam);
 // you done messed up
 +    } else {
   // but otherwise you can move ahead
 +      posts.splice(targetIndex, 1);
 // cut out this post at this spot - again, why is it 1?
 +
 +      res.status(200).json({
 +        success: true
 // yay we did it!
 +      });
 // how come we don't return the new array here?
 +    }
 +  }
 +}); */




module.exports = { posts, server };