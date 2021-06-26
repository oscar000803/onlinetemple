import express from 'express'
import cors from 'cors'
import path from 'path'
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})