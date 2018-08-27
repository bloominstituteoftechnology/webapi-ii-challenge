'use strict'

const express = require('express')
const router = express.Router()
const posts_controller = require('../controllers/post_controller')

router.get('/', posts_controller.getPosts)
router.post('/', posts_controller.addPost)

module.exports = router 