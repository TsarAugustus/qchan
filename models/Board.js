'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
  boardName: String,
  boardUrl: {type: String, unique: true},
  boardDesc: String,
  uuid: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('board', Board);
