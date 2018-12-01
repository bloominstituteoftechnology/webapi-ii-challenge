// import your node modules
const express = require('express');
const server = express();
server.use(express.json());
const PORT = 4000;

const db = require('./data/db.js');

// add your server code starting here

//Return Array of All posted objects
server.get('/api/posts', (req, res) =>{
    db.find()
        .then((posts) =>{
            res.json(posts)
        })
        .catch((err) =>{
            res.status(500)
            res.json({ error: "The posts information could not be retrieved."})
        })
});

//Return post object with specified ID
server.get('/api/posts/:id', (req, res) =>{
    const id = req.params.id;

    db.findById(id)
        .then((post) =>{
            if(post[0]){  //check if post exists
                res.json(post)
            }else{
                res.status(404)
                res.json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch((err) =>{
            res.status(500)
            res.json({ error: "The post information could not be retrieved." });        
        })
});   

//******POST  - Add post******** */
server.post('/api/posts', (req, res) =>{
    //grab post to add 
    const post = req.body;

    if(post.title && post.contents){
        db.insert(post)
            .then(postID =>{
                db.findById(postID.id)
                    .then(post =>{
                        res.status(201)
                        res.json(post)
                    })

            })
            .catch(err => {
                res.status(500)
                res.json({error: "There was an error while saving the post to the database"});
            });
    }else{
        res.status(400);
        res.json({error: "Please provide title and contents for the post."})
    }

});

//*********.PUT - Update post******* */
server.put('/api/posts/:id', (req, res) =>{
    //grab post and id 
    const post = req.body
    const id = req.params.id

    if(post.title && post.contents){

        db.update(id, post) //if successful, returns count of updated 
            .then(count =>{
                if(count){
                    res.status(200)
                    res.json(post)
                }else{
                    res.status(404)
                    res.json({error:"The post with the specified ID does not exist"})
                }
            })
            .catch(err =>{
                res.status(500)
                res.json({error: "The post information could not be modified."})
            })
    }else{
        res.status(400)
        res.json({error: "Please provide title and contents for the post."})
    }
});

//********DELETE  - Delete post ********* */
server.delete('/api/posts/:id', (req, res) =>{
    const id = req.params.id;

    db.findById(id)
        .then(post =>{
            if(post[0]){  //The post exists
                db.remove(id)  //if successful, returns count of deleted
                    .then(count =>{
                        res.status(200)
                        res.json(post)
                    })
            }else{  //post does not exist
                res.status(404)
                res.json({error:"The post with the specified ID does not exist"})
            }
            })
        .catch(err =>{
            res.status(500)
            res.json({error: "The post could not be removed"})
        })

})

// server.delete('/api/posts/:id', (req, res) =>{
//     const {id} = req.params;
//     db.findById(id)
//       .then(user =>{
//         if(user){
//           db.remove(id)
//             .then(count =>{  //db.remove returns # records deleted
//               if(count){
//                 //something has been deleted
//                 //need to send back the user
//                 res.json(user)
//               }else{
//                 //bad id - no user that matched id
//                 res.status(404)
//                 res.json({message: "The user with the specified ID does not exist."})
//               }
//             })
//         }else{
//           res
//           .status(404)
//           .json({ message: "The user with the specified ID does not exist."});
//         }
//       })
//       .catch((err) =>{
//         res.status(500)
//         res.json({message: 'Failed to remove user'})
//       })
//   })

server.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});