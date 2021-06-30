import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import https from 'https'
import mongo from './mongo'
require('dotenv').config()

import route from './route'

const app = express()

const isProduction = true

app.use(cors())
app.use(express.json())
// app.use((req, res, next) => {
//   if (isProduction && req.headers['x-forwarded-proto'] !== 'http')
//     return res.redirect('http://' + req.headers.host + req.url)
//     return next()
// })
app.use('/', route)

const port = process.env.PORT || 3000

mongo.connect();

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
    },
    app
)


sslServer.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
// app.listen(port, () => {
//     console.log(`Server is up on port ${port}.`)
// })