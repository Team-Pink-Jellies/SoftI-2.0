const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// usersRouter.get('/', async (req, res) => {
//   const users = await User.find({}).populate('sessions');
//   res.json(users);
// });

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username });

  if (foundUser) {
    res.status(400).json({ error: 'Username must be unique' });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;
