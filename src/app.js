const { server } = require ('./server.js');
const bodyParser = require ('body-parser');

const port = 3000,
const postsArray = [
    {
        title: "The post title", 
        contents: "The post contents",
    }
];
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send(postsArray);
});

server.get('/posts', (req, res) => {
    let term =req.query;
    console.log(term);
    let result = postArray.find((post) => {
        let post = (req.body);
        postsArray.push(post);
        res.status(201).json(postsArray);
    
})

const { server } = require('./server.js');

server.listen(3000);
