const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
    {idCounter: 3},
    {
        id: 0,
        title: "The post title",
        contents: "The post contents"
    },
    {
        id: 1,
        title: "Stuff",
        contents: "Tother post contents"
    },
    {
    	id: 2,
        title: "Andy",
        contents: "more and werwqerweewrewrmore post contents"
    }
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {

    const query = req.query.term
    if (query) {
        const post = posts.filter(item => item.title == query || item.contents == query)
        res.status(200).json(post);
    } else {
        res.status(200).json(posts);
    }

});

server.post('/posts', (req, res) => {
    const status = validateData(req.body, 'post');
    if (status.error) {
            res.status(406).json(status.msg);
    } else {
        res.status(200).json(status.data);
    }
});

server.put('/posts', (req, res) => {
    const status = validateData(req.body, 'put');
    if (status.error) {
        res.status(406).json(status.msg);
    } else {
        res.status(200).json(status.data);
    }
});

server.delete('/posts', (req, res) => {
    const status = validateData(req.body, 'delete');
    if (status.error) {
        res.status(406).json(status.msg);
    } else {
        res.status(200).json(status.msg);
    }
});

const findPost = (id => {
    return posts.find(item => item.id == id);
});

const validateData = ((data, type) => {
    const status = !data.title || !data.contents || !data.id;
    if (status) {
        return {error: status, msg: {error: "Insuficient Data Provided!!"}};
    } else {
        if (type === 'post') {
            const post = changeData(data, null, 'post');
            return {error: false, data: post};
        } else if (type === 'put') {
            const post = findPost(data.id);
            if (post) {
                const changedPost = changeData(data, post, 'put');
                return {error: false, data: changedPost};
            } else {
                return {error: true, msg: {error: "Post does not exist!"}};
            }
        } else if (type === 'delete') {
            const post = findPost(data.id);
            if (post) {
                const deleted = changeData(null, post, 'delete');
                return {error: false, msg: deleted};
            } else {
                return {error: true, msg: {error: "Post does not exist!"}};
            }
        }
    };
});

const changeData = (data, selectedPost, type) => {
    switch (type) {
        case 'post':
            const id = posts[0].idCounter++;
            data.id = id;
            posts.push(data);
            const post = findPost(data.id);
            return post;

        case 'put':
            selectedPost.title = data.title;
            selectedPost.contents = data.contents;
            return selectedPost;

        case 'delete':
            const index = posts.findIndex(item => {
                return item.id == selectedPost.id;
            });
            posts.splice(index, 1);
            posts[0].idCounter--;
            return { success: true };

        default:
            return null;
    }
}

module.exports = { posts, server };