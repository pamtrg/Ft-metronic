


const express = require('express');
const {getStandardResponse} = require('../models/helper/index');
const Model = require('../models/db/bigspy');

const router = express.Router();


let UserModel = Model.ModelDataSchema;




router.get('/getdata', async (req, res) => {
  

    let commentModel = await UserModel.find({})
    .exec()

    return res.json(getStandardResponse(
        true,
        'Success',
        commentModel
    ))
})



module.exports = router;