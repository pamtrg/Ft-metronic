


const express = require('express');
const { getStandardResponse } = require('../models/helper/index');
const Model = require('../models/db/tiktok');
const router = express.Router();


let UserModel = Model.ModelUserSchema;
let ChannelModel = Model.ModelChannelSchema;
let CommentModel = Model.ModelCommentSchema;
let LiveIdModel = Model.ModelLiveIdSchema;



router.get('/filters', async (req, res) => {
    if (typeof req.query.q !== 'undefined') {
        let userModel = await UserModel.find({ $text: { $search: req.query.q } })
            .sort({ commentCount: 'desc' }).limit(100).exec()
        res.json(userModel)
    } else {
        res.json("Error channel_id")
    }
})
router.get('/get_comment_lists', async (req, res) => {
    console.log(req.query)
    if (typeof req.query.user_id !== 'undefined' && typeof req.query.channel_id !== 'undefined') {
        let commentModel = await CommentModel.find({ userId: req.query.user_id, channelId: req.query.channel_id })
            .populate('userId')
            .limit(100)
            .exec()
        console.log(commentModel[0].comment)
        list = commentModel.map(x => {
            return ({ comment: x });
        })
        res.json(list)
    } else {
        res.json("Error user_id")
    }
})


router.get('/get_channels', (req, res) => {
    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.items_per_page)
    var search = req.query.search
    search ? search = { uniqueId: search } : search = {}

    console.log(pageNo, size, search)
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
   
    ChannelModel.count({}, function (err, totalCount) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" }
            
        }
        ChannelModel.find(search, {}, query, function (err, data) {
            
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = { "error": false, "message": data, "pages": totalPages };
            }
            res.json(response);
        });
    })
})











router.get('/get_live_chat_ids', async (req, res) => {
    if (typeof req.query.channel_id !== 'undefined') {
        let liveIdModel = await LiveIdModel.find({ channelId: req.query.channel_id })
            .limit(100)
            .exec()
        res.json(liveIdModel)
    } else {
        res.json("Error channel_id")
    }
})


module.exports = router;