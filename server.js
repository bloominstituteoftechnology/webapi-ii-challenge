// import your node modules

// add your server code starting here

const server = express();

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: 'Information not found' })
        })
})

server.listen(3000, () => console.log('Working'));
