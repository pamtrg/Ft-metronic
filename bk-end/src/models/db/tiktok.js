


const mongoose = require('mongoose')
let ChannelSchema = new mongoose.Schema({
    channelId : Number,
    uniqueId : String,
    owner: {
      cover : String,
      username: String,
      nickname: String,
      bio_description: String,
      follow_info: {
        follower_count: Number,
        following_count: Number

    }},
    liveChatCount: {
        type: Number, default: 0
    },
    timestamp : {
      start: Number,
      end: Number
    }
}, {
    timestamps: true
})

const ModelChannelSchema = mongoose.model('Channel', ChannelSchema)


let CommentSchema = new mongoose.Schema({
    comment: String,
    userId: String,
    channelId: Number,
}, {
    timestamps: true
})

const ModelCommentSchema = mongoose.model('Comment', CommentSchema)





let UserSchema = new mongoose.Schema({
    userId: String,
    nickname: { type: String },
    uniqueId: String,
    image: String,
    commentCount: {
        type: Number, default: 0
    },
    liveId: { type: mongoose.Schema.Types.ObjectId, ref: 'LiveId' },
}, {
    timestamps: true
})

UserSchema.index({ nickname: 'text' });
const ModelUserSchema = mongoose.model('User', UserSchema)



let LiveIdSchema = new mongoose.Schema({
  liveId: String,
  title: String,
  channelId: Number,
  UserCount: {

    type: Number, default: 0
  },
  timestamp : {
    start: Number,
    end: Number
  }
}, {
  timestamps: true
})

const ModelLiveIdSchema = mongoose.model('LiveId', LiveIdSchema)




let LikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  likeCount: Number,
  totalLikeCount: Number,
  
}, {
  timestamps: true
})

const ModelLikeSchema = mongoose.model('Like', LikeSchema)


let GiftSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {
  timestamps: true
})

const ModelGiftSchema = mongoose.model('Gift', GiftSchema)


module.exports = {
    ModelChannelSchema,
    ModelCommentSchema,
    ModelUserSchema,
    ModelLiveIdSchema,
    ModelLikeSchema,
    ModelGiftSchema
}