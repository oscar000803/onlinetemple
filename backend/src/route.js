import express from 'express'
import db from './db'

const router = express.Router()

router.get('/', (req, res) => {
    console.log("get /")
    res.send("test")
})

router.get('/test', (req, res) => {
    res.send("testing")
})

router.get('/incenseArticle/id', async (req, res) => {
    const incenseArticle_ids = await db.IncenseArticleModel.find({}, '_id')
    res.send({incenseArticle_ids})
})

router.get('/incenseArticle/brief', async (req, res) => {
    // const incense_brief = req
    console.log(req.query)
})

export default router