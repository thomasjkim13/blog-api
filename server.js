// require necessary NPM packages
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
// multer allows to upload images (npm install multer)
const multer = require('multer')

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err))

// indicate images folder
const storage = multer.diskStorage({
  // A string or function that determines the destination path for uploaded files.
  // cb takes care of errors
  destination: (req, file, cb) => {
    // first param is null, and second is our destination, which is images folder
    cb(null, 'images')
    // A function that determines the name of the uploaded file. If nothing is passed, Multer will generate a 32 character pseudorandom hex string with no extension.
  }, filename: (req, file, cb) => {
    // send file to client
    cb(null, req.body.name)
  }
})

// storage is the 'const storage' above
// method to upload our file
const upload = multer({storage: storage})
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)

app.use('/', (req, res) => {
  console.log('hey this is main url')
})

app.listen('5000', () => {
  console.log('Backend is listening')
})
// const cors = require('cors')

// // require route files
// const exampleRoutes = require('./app/routes/example_routes')
// const userRoutes = require('./app/routes/user_routes')

// // require middleware
// const errorHandler = require('./lib/error_handler')
// const requestLogger = require('./lib/request_logger')

// // require database configuration logic
// // `db` will be the actual Mongo URI as a string
// const db = require('./config/db')

// // require configured passport authentication middleware
// const auth = require('./lib/auth')

// // define server and client ports
// // used for cors and local port declaration
// const serverDevPort = 4741
// const clientDevPort = 7165

// // establish database connection
// // use new version of URL parser
// // use createIndex instead of deprecated ensureIndex
// mongoose.connect(db, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// })

// // instantiate express application object
// const app = express()

// // set CORS headers on response from this API using the `cors` NPM package
// // `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
// app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// // define port for API to run on
// const port = process.env.PORT || serverDevPort

// // register passport authentication middleware
// app.use(auth)

// // add `express.json` middleware which will parse JSON requests into
// // JS objects before they reach the route files.
// // The method `.use` sets up middleware for the Express application
// app.use(express.json())
// // this parses requests sent by `$.ajax`, which use a different content type
// app.use(express.urlencoded({ extended: true }))

// // log each request as it comes in for debugging
// app.use(requestLogger)

// // register route files
// app.use(exampleRoutes)
// app.use(userRoutes)

// // register error handling middleware
// // note that this comes after the route middlewares, because it needs to be
// // passed any error messages from them
// app.use(errorHandler)

// // run API on designated port (4741 in this case)
// app.listen(port, () => {
//   console.log('listening on port ' + port)
// })

// // needed for testing
// module.exports = app
