const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// update user
router.put('/:id', async (req, res) => {
  // taking param from the url '/:id'
  if (req.body.userId === req.params.id) {
    // use bcrypt to update our password
    if (req.body.password) {
      // hash password
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      // await since we are restating our user in our database
      // indicate id by req.params.id and update user taking everything inside the body req.body
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
        // if true, return the modified document rather than the original. defaults to false
      }, { new: true })
      // response success with updated user
      res.status(200).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(401).json('You can update only your account!')
  }
})

module.exports = router
