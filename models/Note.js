const mongoose = require('mongoose');
const User = require('../models/User');

const noteSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'not completed'],
    default: 'not completed'
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
