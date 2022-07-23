

const mongoose = require('mongoose')
let ChannelSchema = new mongoose.Schema({
    heat : Number,
    impression : Number,
    days_count : Number,
    like_count : Number,
    dislike_count : Number,
    comment_count : Number,
    share_count : Number,
    last_seen : String,
    image_url : String,


}, {
    timestamps: true
})



const ModelDataSchema = mongoose.model('datas', ChannelSchema)


module.exports = {
    ModelDataSchema
}