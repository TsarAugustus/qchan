'use strict';

const express = require('express');
const session = require('express-session');
const router = express.Router();
const uuid = require('uuid/v1');
const Post = require('../models/Post');
const Board = require('../models/Board');

//Get the homepage
router.get('/', function(req, res) {
  if(!req.session.uuid) req.session.uuid = uuid();

  console.log(req.session.uuid);
  return res.render('index');
});

//Get the page to create a post
router.get('/post', function(req, res) {
  if(!req.session.uuid) req.session.uuid = uuid();

  console.log(req.session.uuid);
  return res.render('post');
});

//Get the page for most recent posts
router.get('/recent', function(req, res) {
  if(!req.session.uuid) req.session.uuid = uuid();

  Post.find({}).sort({date: -1}).exec(function(err, posts) {
    return res.render('recent', {posts: posts});
  });
});

//Get the page to create a board
router.get('/createBoard', function(req, res) {
  return res.render('createBoard');
});

//Get a list of all the boards
router.get('/boardList', function(req, res) {
  Board.find({}).sort({date: -1}).exec(function(err, boards) {
    return res.render('boardList', {boards: boards});
  });
});

//Get a specific board, lists posts for that board
router.get('/board/:boardUrl', function(req, res) {
  Board.findOne({boardUrl: req.params.boardUrl}, function(err, board) {
    // console.log(board);

    Post.find({board: req.params.boardUrl}).sort({date: -1}).exec(function(err, posts) {
      if(!board) {
        return res.status(404);
      }
      return res.render('board', {board: board, posts: posts});
    });
  });
});

//Get a specific post on a specific board, list replies to thread
router.get('/board/:boardUrl/:threadUrl', function(req, res) {
  Board.findOne({boardUrl: req.params.boardUrl}, function(err, board) {
    Post.findOne({url: req.params.threadUrl}, function(err, post) {
      console.log(post);
      return res.render('thread', {post: post});
    });
  });
});

module.exports = router;
