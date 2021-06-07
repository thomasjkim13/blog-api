const router = require('express').Router()
// const User = require('../models/User')
const Post = require('../models/Post')

// Create Post
// The async keyword turns a method into an async method
router.post('/', async (req, res) => {
  // create new post with all properties in Post model
  const newPost = new Post(req.body)
  // The try statement lets you test a block of code for errors
  try {
    // save new post
    // use 'await' because its async function
    // Await suspends the calling method and yields control back to its caller until the awaited task is complete.
    const savedPost = await newPost.save()
    // save new post if status success
    res.status(200).json(savedPost)
    // catch error if wrong info in the input field
    // The catch statement lets you handle the error
  } catch (err) {
    res.status(500).json(err)
  }
})

// UPDATE post
// The async keyword turns a method into an async method
router.put('/:id', async (req, res) => {
  // The try statement lets you test a block of code for errors
  try {
    // use 'await' because its async function
    // The await keyword blocks execution of all the code that follows it until the promise fulfills
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      // The try statement lets you test a block of code for errors
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          // set new porperties inside the body
          $set: req.body
        },
        // if this doesn't exist, you can see the updated post
        // if true, return the modified document rather than the original.
        { new: true }
        )
        res.status(200).json(updatedPost)
        // The catch statement lets you handle the error
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      // respond with error message
      res.status(401).json('You can update only your post!')
    }
    // The catch statement lets you handle the error
  } catch (err) {
    res.status(500).json(err)
  }
})

// DELETE POST
router.delete('/:id', async (req, res) => {
  // The try statement lets you test a block of code for errors
  try {
    // use 'await' because its async function
    // The await keyword blocks execution of all the code that follows it until the promise fulfills
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      // The try statement lets you test a block of code for errors
      try {
        await post.delete()
        res.status(200).json('Post has been deleted!')
        // The catch statement lets you handle the error
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      // respond with error message
      res.status(401).json('You can delete only your post!')
    }
    // The catch statement lets you handle the error
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
