/* SQLite Database */
const db = require('../data/db.js')

/* Utility */
const handleErr = (res, code, e) => res.status(code).json({ Error: e })

/* Controllers */
module.exports = {
  post: async (req, res) => {
    const { title, contents } = req.body
    try {
      if (!title || !contents) return handleErr(res, 400, 'Please provide title or content')
      const response = await db.insert({ title, contents })
      res.status(201).json({ title, contents })
    } catch (e) {
      console.log(e)
      handleErr(res, 500, 'There was an error while saving the post to the database')
    }
  },

  get: async (req, res) => {
    try {
      const posts = await db.find()
      res.status(200).json(posts)
    } catch (e) {
      handleErr(res, 500, 'The posts information could not be retrieved')
    }
  },

  getById: async (req, res) => {
    const { id } = req.params
    try {
      if (!id || isNaN(id)) return handleErr(res, 422, 'Please provide valid id')
      const post = await db.findById(id)
      if (post.length < 1) return handleErr(res, 404, `No post found with id ${id}`)
      res.status(200).json(post)
    } catch (e) {
      handleErr(res, 500, 'The post information could not be retrieved')
    }
  },

  del: async (req, res) => {
    const { id } = req.params
    try {
      if (!id || isNaN(id)) return handleErr(res, 422, 'Please provide valid id')
      const response = await db.remove(id)
      if (!response) return handleErr(res, 404, `No post found with id ${id}`)
      else res.status(200).json(`Success! ${id} was removed`)
    } catch (e) {
      handleErr(res, 500, 'The post could not be removed')
    }
  },

  put: async (req, res) => {
    const { id } = req.params
    const { title, contents } = req.body
    try {
      if (!id || isNaN(id)) return handleErr(res, 422, 'Please provide valid id')
      if (!title || !contents) return handleErr(res, 422, 'Please provide title or content')
      const response = await db.update(id, { title, contents })
      if (!response) return handleErr(res, 404, `No post found with id ${id}`)
      else res.status(200).json({ title, contents })
    } catch (e) {
      handleErr(res, 500, 'The post could not be modified')
    }
  }
}
