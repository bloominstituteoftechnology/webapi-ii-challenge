const express = require('express'); //import express;
const dataB = require('./data/db.js');
const server = express();

server.use(express.json()); //middleware -- express to parse JSON body
let postId = 5; //id numbers starts from here
// let commId = 5;

//collection of blog post tht i intend to modify
// let comments = [
//     {
//         text: 'The text of the comment',
//         post_id: 1, // Integer, required, must match the id of a post entry in the database
//     },
//     {
//         text: 'This is a second comment to the second post',
//         post_id: 2, // Integer, required, must match the id of a post entry in the database
//     },
//     {
//         text: 'This is a third comment to the third post',
//         post_id: 3, // Integer, required, must match the id of a post entry in the database
//     },
//     {
//         text: 'This is a fourth comment to the fourth post',
//         post_id: 4, // Integer, required, must match the id of a post entry in the database
//     },
// ];

// let posts = [
//     {
//         id: 1,
//         title: 'Keeping up with the Joneses',
//         contents: "Trying to match everyone's glamorous lifestyle with debt",
//         comments: [1, 2],
//     },
//     {
//         id: 2,
//         title: 'How I earned my first million',
//         contents: 'Money management skills to upgrade to a social class',
//         comments: [3, 4],
//     },
//     {
//         id: 3,
//         title: 'Things I would have told my 20 year old self',
//         contents:
//             'From depression, to social interaction, to travels, and self improvement',
//         comments: [1, 3],
//     },
//     {
//         id: 4,
//         title: 'How web development saved my life',
//         contents: 'Finding my passion through programming',
//         comments: [2, 3],
//     },
// ];

//sanity check endpoint
server.get('/', (req, res) => {
    res.status(200).json({ api: 'up....' });
});

// server.get('/api/posts', (req, res) => {
//     const minRating = req.query.minrating;
//     let result = [...movies]

//     if(minRating){
//         result = movies.filter(m => m.rating >= minRating);

//     }
//     res.status(200).json(result);
// });

// //-*-*-*-* GET REQUEST  -*-*-*-*
server.get('/api/posts', (req, res) => {
    dataB('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch();
    // res.status(200).json(posts);
});

// server.get('/api/comments', (req, res) => {
//     res.status(200).json(comments);
// });

// -*-*-*-* POST REQUEST  -*-*-*-*
// server.post('/api/posts', (req, res) => {
//     const bpost = req.body;

//     //add the new id
//     bpost.id = postId++;
//     posts.push(bpost);

//     res.status(200).json(posts);
// });

server.post('/api/posts', (req, res) => {
    const bpost = req.body;
    const { title, contents } = req.body;

    if (title && contents) {
        dataB
            .insert(bpost)
            .then(Objres => {
                res.json(Objres);
                res.status(201); //created
            })
            .catch(err => {
                res.render(err);
                res.render.status(500);
            });
    } else {
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.',
        });
    }

    //add the new id
    bpost.id = postId++;
    posts.push(bpost);

    res.status(200).json(posts);
});

server.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    dataB
        .findById(id, changes)
        .then(upd => {
            if (upd) {
                res.status(200).json(upd);
            } else {
                res.status(404).json({ message: 'hub not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error removed the hub' });
        });

    // res.send('hello web 21');
    // dataB
    //     .find() //return a promise.
    //     .then(hubs => {
    //         // .json will convert the data passed to JSON
    //         // also tells the client we're sending JSON through and HTTP header
    //         res.status(200).json(hubs);
    //     })
    //     .catch(err => {
    //         res.status(500).json({ message: 'error getting the list of hubs' });
    //     });
});
// server.post('/api/posts/:id/comments', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;

//     dataB
//         .update(id, changes)
//         .then(updated => {
//             if (updated) {
//                 res.status(200).json(updated);
//             } else {
//                 res.status(404).json({ message: 'hub not found' });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error:
//                     'There was an error while saving the comment to the database',
//             });
//         });
// });

//Comments

// server.post('/api/posts/:id/comments', (req, res) => {

//     const { id } = req.param.id;
//     const bpost = req.body;
//     const { title, contents } = req.body;

// if (title && contents) {

// dataB
//     .findById(bpost)
//     .then(article => {
//         console.log('article', article);

//         if (article) {
//             res.status(201).json(article); //created
//         } else {
//             res.status(404).json({
//                 error: 'The user with the specified ID does not exist.',
//             });
//         }
//     })
//     .catch(err => {
//         // res.render(err);
//         res.status(500).json({
//             error: 'The user information could not be retrieved.',
//         });
//     });

// } else {
//     res.status(400).json({
//         errorMessage: 'Please provide title and contents for the post.',
//     });
// }

//add the new id
// bpost.id = postId++;
// posts.push(bpost);

// res.status(200).json(posts);

//** */
// });

// server.post('/api/posts', (req, res) => {
//     res.status(200).json(posts);
// });

// server.post('/api/posts/:id/comments', (req, res) => {
//     res.status(200).json(posts);
// });

//-*-*-*-* GET REQUEST  -*-*-*-*
// server.get('/api/posts', (req, res) => {
//     res.status(200).json(posts);
// });

// server.get('/api/posts/:id', (req, res) => {
//     res.status(200).json(posts);
// });

// server.get('/api/posts/:id/comments', (req, res) => {
//     res.status(200).json(posts);
// });

//-*-*-*-* DELETE REQUEST  -*-*-*-*
server.delete('/api/posts/:id', (req, res) => {
    //(:id is a string you have to convert into a number)
    const id = req.param.id;

    posts = posts.filter(p => p.id !== Number(id));

    res.status(200).json(posts);
});

//-*-*-*-* UPDATE REQUEST  -*-*-*-*
// server.put('/api/posts/:id', (req, res) => {

//     res.status(200).json(posts);
// });

server.put('/api/posts/:id', (req, res) => {
    res.status(200).json(posts);
});

//Export
module.exports = server;
