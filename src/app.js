/* eslint-disable */
const { server } = require('./server.js');
const bodyParser = require('body-parser');
const port = 3000; // The port we are going to listen to.
const postsArray = [
    {
        title: "The post title",
        contents: "The post contents",
    },
];

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send(postsArray);
});

server.get('/posts', (req, res) => {
    let term = req.query.term;
    let returnArr = []; // Array of items to return if something matches
    postsArray.forEach((post, index) => {
        let objValues = Object.values(post);
        let postMatch = false; // Flag for contains string inside matching

        objValues.forEach((strItem, index) => { // Function for matching partial string inside
            if (strItem.includes(term)) postMatch = true;
        });
        if (postMatch) {
            returnArr.push(post)
        };
        return returnArr;
    });
    if (term !== undefined) {
        res.status(200).json(returnArr);
    } else {
        res.status(200).json(postsArray);
    }
});

server.post('/posts', (req, res) => {
    let post = (req.body); // Parse body of post and set it to a variable
    postsArray.push(post);
    res.status(201).json(postsArray);
});

server.put('/posts', (req, res) => {
    let post = (req.body); // Parse body of post and set it to a variable
    postsArray[Number(post.id)] = post;
    res.status(201).json(postsArray);
})

server.delete('/posts', (req, res) => {
    let post = (req.body); // Parse body of post and set it to a variable
    if (!post.id || postsArray.length < Number(post.id)) {
        res.status(404).json("Please Provide an ID");
    } else {
        postsArray.splice(Number(post.id), 1);
        res.status(201).json(postsArray);
    }
})

server.listen(port, () => console.log(`Server is listening on localhost:${port}`));
