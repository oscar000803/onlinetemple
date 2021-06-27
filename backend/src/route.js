import express from 'express'
import db from './db'
import HASH from '../util/hash'

const router = express.Router()

router.get('/', (req, res) => {
    console.log("get /")
    res.send("test")
})

router.get('/test', async (req, res) => {
    const newData = await new db.IncenseArticleModel({
        name: "name",
        title: "title",
        content: "content",
        incense: []
    }).save()
    res.send(newData)
})

router.get('/incenseArticle/id', async (req, res) => {
    const IA_id = await db.IncenseArticleModel.find({}, '_id')
    let incenseArticle_ids = []
    IA_id.forEach((object) => {
        incenseArticle_ids.push(object._id)
    })
    res.send({incenseArticle_ids})
})

router.get('/incenseArticle/brief', async (req, res) => {
    const { incenseArticle_ids } = req.query
    let incense_brief = []
    for(const id of incenseArticle_ids){
        let I = await db.IncenseArticleModel.findById(id, 'title name incense')
        const incenseCount = I.incense.length
        const {title, name, _id} = I
        let newBrief = {
            incenseArticle_ids: _id,
            title, 
            name, 
            incenseCount
        }
        incense_brief.push(newBrief)
    }
    res.send({incense_brief})
})

router.get('/incenseArticle/detail', async (req, res) => {
    const { incenseArticle_id } = req.query
    let incenseArticle = await db.IncenseArticleModel.findById(incenseArticle_id).populate([{ path: 'incense'}])
    res.send({incenseArticle})
})

router.post('/incenseArticle', async (req, res) => {
    const { name, title, content } = req.body.params
    const newIncenseArticle = await new db.IncenseArticleModel({
        name,
        title,
        content,
        incense: []
    }).save()
    res.send()
})

router.post('/incense', async (req, res) => {
    const { incenseArticle_id, name, content, time } = req.body.params
    const Incense = await db.IncenseModel({
        name,
        content,
        time
    }).save()
    const incenseArticle = await db.IncenseArticleModel.findById(incenseArticle_id)
    incenseArticle.incense.push(Incense._id)
    incenseArticle.save()
    res.send()
})

router.post('/straw', async (req, res) => {
    const { title, content, discription, name } = req.body.params
    await new db.StrawModel({
        title,
        content,
        name,
        discription
    }).save()
    res.send()
})

router.get('/straw', async (req, res) => {
    const count = await db.StrawModel.countDocuments({})
    const index = Math.floor(Math.random() * count)
    const straws = await db.StrawModel.find({})
    const straw = straws[index]
    res.send(straw)
})

router.get('/divination', async (req, res) => {
    const { name, birthday } = req.query
    const count = await db.DivinationModel.countDocuments({})
    const index = HASH(name, birthday, count)
    const divinations = await db.DivinationModel.find({})
    const divination = divinations[index]
    res.send(divination)
})

router.post('/light', async (req, res) => {
    const { name } = req.body.params
    await new db.LightModel({
        name
    }).save()
    res.send()
})

router.get('/light', async (req, res) => {
    const lights = await db.LightModel.find({})
    res.send(lights)
})

export default router