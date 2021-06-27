import mongoose from 'mongoose'

const { Schema } = mongoose

const incenseArticleSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    incense: [{ type: mongoose.Types.ObjectId, ref: 'Incense' }]
})

const incenseSchema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: Number, required: true }
})

const strawSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    name: { type: String, required: true },
    discription: { type: String, required: true },
})

const divinationSchema = new Schema({
    content: { type: String, required: true }
})

const lightSchema = new Schema({
    name: { type: String, required: true}
})

const IncenseArticleModel = mongoose.model('IncenseArticle', incenseArticleSchema)
const IncenseModel = mongoose.model('Incense', incenseSchema)
const StrawModel = mongoose.model('Straw', strawSchema)
const DivinationModel = mongoose.model('Divination', divinationSchema)
const LightModel = mongoose.model('Light', lightSchema)

const db = {
    IncenseArticleModel,
    IncenseModel,
    StrawModel,
    DivinationModel,
    LightModel
}

export default db