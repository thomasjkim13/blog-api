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
    // error 500 means something is wrong with express server or MongoDB
    res.status(500).json(err)
  }
})

// Singin
router.post('/signin', async (req, res) => {
  try {
    // find user by using User model and find one user with unique username
    // try to find inside mongoDB
    const user = await User.findOne({username: req.body.username})
    // if there is no user in the mongoDB, respond with error wrong credentials
    !user && res.status(400).json('Wrong credentials!')
    // compare raw password with hashed password
    const validated = await bcrypt.compare(req.body.password, user.password)
    // if not validated, respond with error wrong credentials
    !validated && res.status(400).json('Wrong credentials!')
    // prevent hashed password from being sent to the user
    const { password, ...others } = user._doc

    // respond if success
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
