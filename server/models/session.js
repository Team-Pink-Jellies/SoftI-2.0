const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
