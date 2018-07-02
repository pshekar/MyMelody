var express = require('express');
var mongoose = require('mongoose');
var Post = require('../models/post');
var Tag = require('../models/tag');

var router = express.Router();

router.route('/')
    // get all all tags
    .get((req, res) => {
        Tag.find({})
            .populate({
                path: 'posts',
                populate: {
                    path: 'track',
                    model: 'Track'
                }
            })
            .exec((err, tags) => {
                if (err) res.send(err);
                else res.jsonp(tags);
            });
    })
    // save new tag
    .post((req, res) => {
        var newTag = new Tag();
        newTag.tag = req.body.tag;
        newTag.posts = req.body.posts;

        newTag.save(err => {
            if (err) res.send(err);
            else {
                res.jsonp(newTag);
            }
        });
    });

router.route('/:tag')
    //get one tag
    .get((req, res) => {
        Tag.findOne(
            {tag: req.params.tag})
            .populate({
                path: 'posts',
                populate: {
                    path: 'track',
                    model: 'Track'
                }
            })
            .exec((err, tag) => {
                if (err) res.send(err);
                else {
                    res.jsonp(tag);
                }
            }
        )
    })
    //find and update a tag
    .put((req, res) => {
        Tag.findOneAndUpdate(
            {tag: req.params.tag},
            {$set: req.body},
            {new: true},
            (err, tag) => {
                if (err) res.jsonp(err);
                else res.jsonp(tag);
            }
        )
    });

router.route('/search/:string')
    .get((req, res) => {
        Tag.find({'tag': new RegExp(req.params.string, 'i')}, 'tag', (err, tags) => {
            if (err) res.send(err);
            res.jsonp(tags);
        });
    });

module.exports = router;
