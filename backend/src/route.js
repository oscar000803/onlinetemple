import express from 'express'
import db from './db'
import HASH from '../util/hash'

const router = express.Router()

const logMessage = (req) => {
    console.log(`request from ${req.headers.referer}, ${req.method} ${req.url}`)
}

const logErrorMessage = (req, e) => {
    console.log(`request from ${req.headers.referer}, ${req.method} ${req.url} encounter with error, error message: ${e}`)
}

router.use((req, res, next)=>{
    logMessage(req)
    next()
})

router.get('/test', async (req, res) => {
    try{
        for(var i = 0; i < 10; i++){
            const IA = await db.IncenseArticleModel({
                name: `incenseArticle${i}`,
                title: `incenseArticle title${i}`,
                content: `incenseArticle content${i}`,
                incense: []
            }).save()
            for(var j = 0; j < 10; j++){
                const I = await db.IncenseModel({
                    name: `incense${i}-${j}`,
                    content: `incense content${i}-${j}`,
                    time: Date.now()
                }).save()
                IA.incense.push(I._id)
            }
            IA.save()
        }
        for(var i = 0; i < 10; i++){
            await db.StrawModel({
                title: `straw title ${i}`,
                content: `straw conent ${i}`,
                name: `straw ${i}`,
                description: `straw description ${i}`,
            }).save()
        }
        for(var i = 0; i < 10; i++){
            await db.DivinationModel({
                content: `divination conent ${i}`,
            }).save()
        }
        for(var i = 0; i < 10; i++){
            await db.LightModel({
               name: `light ${i}`,
            }).save()
        }
        res.send()
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.get('/incenseArticle/id', async (req, res) => {
    try{
        const { queryType, query } = req.query
        console.log("query id :", queryType, query)
        let IA_id = [];
        if(queryType === "")
            IA_id = await db.IncenseArticleModel.find({}, '_id')
        else if (queryType === "IncenseArticle")
            IA_id = await db.IncenseArticleModel.find({title: query}, '_id')
        else if (queryType === "Initiator")
            IA_id = await db.IncenseArticleModel.find({name: query}, '_id')
        let incenseArticle_ids = []
        IA_id.forEach((object) => {
            incenseArticle_ids.push(object._id)
        })
        if(incenseArticle_ids.length === 0){
            throw new Error("no article in database")
        }
        res.send({incenseArticle_ids})
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
    
})

router.get('/incenseArticle/brief', async (req, res) => {
    try{
        const { incenseArticle_ids } = req.query
        if(!incenseArticle_ids)
            throw new Error('incenseArticle_ids was empty')
        let incense_brief = []
        for(const id of incenseArticle_ids){
            let I = await db.IncenseArticleModel.findById(id, 'title name incense')
            if(!I)
                throw new Error('wrong incenseArticle id')
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
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.get('/incenseArticle/detail', async (req, res) => {
    try{
        const { incenseArticle_id } = req.query
        if(!incenseArticle_id)
            throw new Error('incenseArticle_id was not defined')
        let incenseArticle = await db.IncenseArticleModel.findById(incenseArticle_id).populate([{ path: 'incense'}])
        if(!incenseArticle)
            throw new Error('wrong incenseArticle id')
        res.send({incenseArticle})
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.post('/incenseArticle', async (req, res) => {
    try{
        const { name, title, content } = req.body.params
        if(!name ||!title || !content){
            let message = `${!name?'name':''} ${!title?'title':''} ${!content?'content':''} is required`
            throw new Error(message)
        }
        const newIncenseArticle = await new db.IncenseArticleModel({
            name,
            title,
            content,
            incense: []
        }).save()
        res.send()
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.post('/incense', async (req, res) => {
    try{
        const { incenseArticle_id, name, content, time } = req.body.params
        if(!name ||!time || !content || !incenseArticle_id){
            let message = `${!name?'name':''} ${!time?'time':''} ${!content?'content':''} ${!incenseArticle_id?'incenseArticle_id':''} is required`
            throw new Error(message)
        }
        const incenseArticle = await db.IncenseArticleModel.findById(incenseArticle_id)
        if(!incenseArticle)
            throw new Error('wrong incenseArticle id')
        const Incense = await db.IncenseModel({
            name,
            content,
            time
        }).save()
        incenseArticle.incense.push(Incense._id)
        incenseArticle.save()
        res.send()
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.post('/straw', async (req, res) => {
    try{
        const { title, content, description, name } = req.body.params
        if(!name ||!title || !content || !description){
            let message = `${!name?'name':''} ${!time?'time':''} ${!content?'content':''} ${!description?'description':''} is required`
            throw new Error(message)
        }
        await new db.StrawModel({
            title,
            content,
            name,
            description
        }).save()
        res.send()
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.get('/straw', async (req, res) => {
    try{
        const count = await db.StrawModel.countDocuments({})
        const straws = await db.StrawModel.find({})
        if(!count || !straws)
            throw new Error('no straw in database')
        const index = Math.floor(Math.random() * count)
        const straw = straws[index]
        res.send(straw)
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.post('/divination', async (req, res) => {
    try{
        console.log("get post divination :", req.body.params)
        const { content } = req.body.params
        if(!content)
            throw new Error('content is required')
        await db.DivinationModel({
            content
        }).save()
        res.send()
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.get('/divination', async (req, res) => {
    try{
        const { name, birthday } = req.query
        if(!name && !birthday)
            throw new Error('one of name and birthday should be filled in')
        const count = await db.DivinationModel.countDocuments({})
        const divinations = await db.DivinationModel.find({})
        if(!count || !divinations)
            throw new Error('no divination in database')
        const index = HASH(name, birthday, count)
        const divination = divinations[index]
        res.send(divination)
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.post('/light', async (req, res) => {
    try{
        const { name } = req.body.params
        if(!name)
            throw new Error('name is required')
        await new db.LightModel({
            name
        }).save()
        res.send()
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

router.get('/light', async (req, res) => {
    try{
        const lights = await db.LightModel.find({})
        res.send(lights)
    }
    catch(e){
        logErrorMessage(req, e)
        res.status(400).send({error_message: `${e}`})
    }
})

export default router