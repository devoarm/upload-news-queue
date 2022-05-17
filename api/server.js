const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const _ = require('lodash')
const router = express.Router()
var rimraf = require('rimraf')

const app = express()

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
)

//add other middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const user = {
  id: 1,
  username: 'john',
  email: 'john@doe.com',
  name: 'John Doe',
}

router.get('/', (req, res) => {
  return res.json(5555)
})
router.post('/upload/:service', (req, res) => {
  const { service } = req.params
  // return res.json(typeFile)
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      })
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let media = req.files.media
      let filename = req.files.media.name
      let typeFile = filename.split('.').slice(-1)

      rimraf(`./static/media/sevice-${service}`, () => {
        media.mv(`./static/media/sevice-${service}/sevice-${service}.${typeFile}`)
      })

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: media.name,
          mimetype: media.mimetype,
          size: media.size,
        },
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  // query db.
  console.log(req.body)

  if (email === 'itaranhospital@gmail.com' && password === 'aran10870') {
    return res.json({
      data: {
        user,
        token: 'THIS_IS_TOKEN',
      },
    })
  } else {
    return res.status(401).json({
      message: 'Invalid Password',
    })
  }
})

app.use(router)

module.exports = {
  path: '/api',
  handler: app,
}
