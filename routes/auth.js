const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

// SignUp user
router.post('/signup', async (req, res) => {
  try {
    // hashing password
    // the cost of processing data. Default 10
    // use 'await' because its async function
    const salt = await bcrypt.genSalt(10)
    // hash password
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    // require all the properties in the User model
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass
    })
    const user = await newUser.save()
    // create success message
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
