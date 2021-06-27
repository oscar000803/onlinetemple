import express from 'express'
import db from './db'

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
    let incenseArticle = await db.IncenseArticleModel.findById(incenseArticle_id)
    res.send({incenseArticle})
})

router.post('/incenseArticle', async (req, res) => {
    const { name, title, content } = req.body.params
    console.log(name, title, content)
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
    console.log(req.body)
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

export default router