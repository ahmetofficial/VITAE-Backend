// Developer: Ahmet Kaymak
// Date: 18.02.2017

'use strict';

var models = require('../../models');
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var uuidv1 = require('uuid/v1');

//getAllTheUserData (newest comes first)
router.get('/posts/getByUserId/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    models.USER_POST.findAll({
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
    models.USER_POST.findAll({
        include: [
            {
                attributes: ['user_name'],
                model: models.USERS,
                include: [
                    {
                        attributes: [],
                        model: models.USER_CONNECTIONS,
                        where: {
                            active_user_id: user_id
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
router.post('/posts/createPost/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    var post_text = req.body.post_text;
    var url = req.body.url;
    var user_ip = req.body.user_ip;
    models.USER_POST.create({
        post_id: uuidv1(),
        user_id: user_id,
        post_text: post_text,
        user_ip: user_ip,
        like_count: 0,
        comment_count: 0,
        url: url
    }).then(function () {
        res.status(200).json({
            status: 'true'
        });
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

//create a post comment
router.post('/posts/createPostComment', function (req, res, next) {
    var post_id = req.body.post_id;
    var user_id = req.body.user_id;
    var comment_text = req.body.comment_text;
    var user_ip = req.body.user_ip;
    models.USER_POST_COMMENT.create({
        post_comment_id: uuidv1(),
        post_id: post_id,
        user_id: user_id,
        comment_text: comment_text,
        user_ip: user_ip
    }).then(function () {
        updatePostCommentCount(post_id);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

function updatePostCommentCount(post_id, res) {
    models.USER_POST.find({
        where: {
            post_id: post_id
        }
    }).then(function (USER_POST) {
        USER_POST.update(
            {comment_count: sequelize.literal('comment_count + 1')},
            {
                fields: ['comment_count'],
                where: {
                    post_id: post_id
                }
            }).then(function () {
            res.status(200).json({
                status: 'true'
            })
        }).catch(function (error) {
            res.status(500).json(error)
        });
    });
}


//create a post like
router.post('/posts/createPostLike', function (req, res, next) {
    var post_id = req.body.post_id;
    var user_id = req.body.user_id;
    var user_ip = req.body.user_ip;
    models.USER_POST_LIKE.create({
        post_comment_id: uuidv1(),
        post_id: post_id,
        user_id: user_id,
        user_ip: user_ip
    }).then(function () {
        updatePostLikeCount(post_id, res);
    }).catch(function (error) {
        res.status(500).json(error)
    });
});

function updatePostLikeCount(post_id, res) {
    models.USER_POST.find({
        where: {
            post_id: post_id
        }
    }).then(function (USER_POST) {
        USER_POST.update(
            {like_count: sequelize.literal('like_count + 1')},
            {
                fields: ['like_count'],
                where: {
                    post_id: post_id
                }
            }).then(function () {
            res.status(200).json({
                status: 'true'

            })
        }).catch(function (error) {
            res.status(500).json(error)
        });
    });
}


//delete the post
router.delete('/posts/delete/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    var post_id = req.body.post_id;
    models.USER_POST.destroy({
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