'use strict'

const express = require('express')
const router = express.Router()
const posts_controller = require('../controllers/post_controller')

router.get('/', posts_controller.getPosts)
router.get('/:id', posts_controller.getPostByID)
router.post('/', posts_controller.addPost)
router.put('/:id', posts_controller.updatePost)
router.delete('/:id', posts_controller.deletePost)

module.exports = router 