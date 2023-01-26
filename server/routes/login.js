const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({
      error: 'invalid username or password',
    });
  }

  res.status(200).send('Successfully logged in.');

  // Client should be redirected towards the /home endpoint upon successful login
});

module.exports = loginRouter;
