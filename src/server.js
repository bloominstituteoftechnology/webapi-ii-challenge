const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [{ id: 1, title: "this test post", contents: "this test post has some content"},
{ id: 2, title: "unique", contents: "completely unique, no words common with other postcontents"},
{ id: 3, title: "yet another post", contents: "this one also has some content, lots of content in fact (at least in comparison to others)"}, 
{ id: 4, title: "Things I'm not a fan of:", contents: "(1) making up content for testing purposes"}, 
{ id: 5, title: "One last title", contents: "and some body text to go along with that last post"}];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());


/*
When the client makes a GET request to /posts:
    If the client provides the query-string parameter term
        filter the posts to those that have the term in their title or contents (or both)
        send down those posts in a JSON response.
    Otherwise
        send down the full array of posts as a JSON response.
*/
server.get('/posts', function(req, res) {
    if (req.query.q !== '') {
        const results = posts.filter(post => post.title.includes(req.query.q))
        res.status(200).json(results);
    }
    res.status(200).json(posts);
});




/*
POST /posts
    When the client makes a POST request to /posts:
        Ensure that the client provides both title and contents in the request body
        If any of these don't exist
            send an object of the form { error: "Error message" } as a JSON response
            Make sure to respond with an appropriate status code
        If all fields are provided
            create a new post object
            Assign the post a unique, numeric id property that will act as its identifier, and add it to the posts array
            Return the newly created post object, with its assigned id, to the client in a JSON response.
*/

server.post('/posts', function(req, res) {
    if (req.body.title === '' || req.body.contents === '') {
        res.status(400).json({ error: "You need to submit a title and contents!" });
    } else {
        newPost = { id: posts.length, title: req.body.title, contents: req.body.contents };
        posts.push(newPost);
        res.status(201).json(newPost);
    }
})

/*
PUT /posts
    When the client makes a PUT request to /posts:
        Ensure that the client provides id, title, and contents in the request body
        If any of these don't exist
            send an object of the form { error: "Error message" } as a JSON response
            Make sure to respond with an appropriate status code.
        If the id doesn't correspond to a valid post
            respond with an error in the same form as above.
        Modify the post with the given id, updating its title and contents
        Respond with the newly updated post object in a JSON response.
*/


server.put('/posts', function(req, res) {
    if (req.body.title === '' || req.body.contents === '' || req.body.id === '') {
        res.status(400).json({ error: "You need to submit an id, title, and contents!" });
    const index = posts.findIndex(item => item.id===req.body.id);
    if (index !== -1){
        const editedPost = { id: req.body.id, title: req.body.title, contents: req.body.contents };
        posts.splice(index, 1, editedPost);
        res.status(201).json(editedPost);
    } else {
        res.status(400).json({ error: "Please check your id and resubmit" })};
}})

/*
DELETE /posts
    When the client makes a DELETE request to /posts:
        Ensure that the client provides an id in the request body, and that the id corresponds to a valid post
        If there's an error, send an object of the form { error: "Error message" } as a JSON response
            Make sure to respond with an appropriate status code.
        Remove the post with the given id from the array of posts
        Return the object { success: true } in a JSON response.

*/

server.delete('/posts', function(req, res) {
    const index = posts.findIndex(item => item.id === req.body.id);
    if (index !== -1) {
        posts.splice(index, 1);
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ error: "Something went wrong :(" });
    }
    })

// TODO: your code to handle requests

module.exports = { posts, server };
