var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');

var router = express.Router();

router.route('/')
    // get all users
    .get((req, res) => {
        User.find({})
        .populate({
                path: 'savedSongs',
                populate: {
                    path: 'track',
                    model: 'Track'
                }
            })
        .exec((err, users) => {
            if (err) res.send(err);
            else res.jsonp(users);
        })
    })
    // save new user
    .post((req, res) => {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;

        newUser.save(err => {
            if (err) res.send(err);
            else res.jsonp({ message: `User "${newUser.username}" created!`});
        })
    });

router.route('/:username')
    // get one user
    .get((req, res) => {
        User.findOne(
            {username: req.params.username})
            .populate({
                path: 'savedSongs',
                populate: {
                    path: 'track',
                    model: 'Track'
                }
            })
            .exec((err, user) => {
                if (err) res.send(err);
                else {
                    res.jsonp(user);
                }
            }
        )
    })
    // find and update a user
    .put((req, res) => {
        User.findOneAndUpdate(
            {username: req.params.username},
            {$set: req.body},
            {new: true},
            (err, user) => {
                if (err) res.jsonp(err);
                else res.jsonp(user);
            }
        )
    });

router.route('/search/:string')
    .get((req, res) => {
        User.find({'username': new RegExp(req.params.string, 'i')}, 'username', (err, users) => {
            if (err) res.send(err);
            res.jsonp(users);
        });
    });



module.exports = router;
