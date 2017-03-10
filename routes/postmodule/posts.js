// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();

//getAllTheUserData (newest comes first)
router.get('/posts/getByUserId/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_POSTS.findAll({
        where: {
            user_id: user_id
        },
        order: [['created_at', 'DESC']]
    }).then(function (USER_POSTS) {
        res.send({posts: USER_POSTS});
    })
});

//live feeding user timeline
router.get('/posts/liveFeed/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_POSTS.findAll({
        include: [
            {
                attributes: ['user_name'],
                model: models.USERS,
                include:[
                    {
                        attributes: [],
                        model: models.RELATIONSHIPS,
                        where: {
                            active_user_id: user_id,
                            status_id: 1
                        }
                    }
                ]
            }
        ],
        order: [['created_at', 'DESC']]
    }).then(function (USER_POSTS) {
        res.send({posts: USER_POSTS});
    });
});

//create a post
router.post('/posts/create/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    var post_text = req.body.post_text;
    var url = req.body.url;
    models.USER_POSTS.create({
        user_id: user_id,
        post_text: post_text,
        url: url
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//delete the post
router.delete('/posts/delete/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var post_id = req.body.post_id;
    models.USER_POSTS.destroy({
        where: {
            user_id: user_id,
            post_id: post_id
        }
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});


module.exports = router;