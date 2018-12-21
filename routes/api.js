'use strict';

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Board = require('../models/Board');

//TODO: ADD ERROR HANDLING
// ALL VERY QUICK


//ADD SAVING


router.post('/threadReply', function(req, res, done) {
  // console.log(req.body);
  let reply = req.body.content;
  Board.findOne({boardUrl: req.body.board}, function(err, board) {
    // console.log(board);
    Post.findOne({url: req.body.url}, function(err, post) {
      console.log(post)
      post.replies.push({
        content: req.body.content
      });

      post.save(function(err) {
        if(err) throw err;

        // console.log('Reply saved');
      });

    });
  });
  return res.redirect('/recent')
});

router.post('/post', function(req, res, next) {
  console.log(req.body);
  Board.findOne({boardUrl: req.body.board}, function(err, board) {
    // console.log(board);
    if(board != null) {
      console.log('posted');
      Post.find({board: req.body.board}, function(err, posts) {
        //console.log(posts.length);
        let url = posts.length + 1;
        console.log(url);

        let newPost = new Post();
        newPost.title = req.body.title;
        newPost.content = req.body.content;
        newPost.uuid = req.session.uuid;
        newPost.board = req.body.board;
        newPost.url = url;
        newPost.save(function(err) {
          if (err) throw err;
          console.log('Posted');
        });
      });
    }
  });

  return res.redirect('/board/' + req.body.board);
});

router.post('/deletePost/:postID', function(req, res) {
  Post.findById(req.params.postID, function(err, post) {
    if(post.uuid === req.session.uuid) {
      Post.deleteOne({_id: req.params.postID}, function(err, post) {
        if(err) throw err;
      });
    } else {
      console.log('Not the same user');
    }

    // Post.deleteOne({_id: req.params.postID}, function(err, post) { if (err) throw err });
  });

  return res.redirect('/recent');
});

router.post('/createBoard', function(req, res) {
  let newBoard = new Board();
  newBoard.boardName = req.body.boardName;
  newBoard.boardUrl = req.body.boardUrl;
  newBoard.boardDesc = req.body.boardDesc;

  newBoard.save(function(err) {
    if(err) throw err;
    console.log('New Board: ' + newBoard);
  });

  return res.redirect('/boardList');
});

module.exports = router;
