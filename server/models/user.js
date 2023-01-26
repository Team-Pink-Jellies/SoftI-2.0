const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
