const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const _ = require('lodash')
const router = express.Router()
var rimraf = require('rimraf')
const conn = require('./db')
const app = express()
require('dotenv').config()

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

router.get('/', (req, res) => {
  return res.json(process.env)
})
router.get('/news', (req, res) => {
  conn.query('SELECT * FROM news_queue', (err, results) => {
    return res.json(results)
  })
})
router.delete('/news/:id', (req, res) => {
  const { id } = req.params
  conn.query(`DELETE FROM news_queue WHERE id = ${id}`, (err, results) => {
    return res.json({ status: 200, results: results })
  })
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
      let filename = `${Date.now()}${req.files.media.name}`
      let typeFile = filename.split('.').slice(-1)

      // rimraf(`./static/media/sevice-${service}`, () => {
      //   media.mv(
      //     `./static/media/sevice-${service}/sevice-${service}.${typeFile}`
      //   )
      // })
      media.mv(`./static/media/${filename}`)
      conn.query(
        `INSERT INTO news_queue (url,service_point)
      VALUES ('${process.env.baseUrl}/media/${filename}','${service}')`,
        function (err, rows, fields) {
          if (err) return res.json({ status: 500, err: err })
          // Connection is automatically released when query resolves
          console.log(fields)
        }
      )

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

app.use(router)

module.exports = {
  path: '/api',
  handler: app,
}
