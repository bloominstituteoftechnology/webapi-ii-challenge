const router = require('express').Router()
const { del, get, getById, post, put } = require('./controllers.js')

router.post('/api/posts', post)
router.get('/api/posts', get)
router.get('/api/posts/:id', getById)
router.delete('/api/posts/:id', del)
router.put('/api/posts/:id', put)

module.exports = router