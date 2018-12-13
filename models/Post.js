'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  title: String,
  content: String,
  uuid: String,
  url: Number,
  board: String,
  replies: [{
    content: String
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', Post);
