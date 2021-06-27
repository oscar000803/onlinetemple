import mongoose from 'mongoose'

const { Schema } = mongoose

const incenseArticleSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    incense: [{ type: mongoose.Types.ObjectId, ref: 'incense' }]
})

const incenseSchema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    data: { type: Date, required: true }
})

const IncenseArticleModel = mongoose.model('IncenseArticle', incenseArticleSchema)
const IncenseModel = mongoose.model('Incense', incenseSchema)

const db = {
    IncenseArticleModel,
    IncenseModel
}

export default db