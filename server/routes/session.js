const sessionsRouter = require('express').Router();
const Session = require('../models/session.js');
const videoController = require('../controllers/videoController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST request to /video endpoint
sessionsRouter.post(
  '/',
  videoController.upload.single('file'),
  videoController.uploadFile,
  (req, res) => {
    res.status(200).send('Video uploaded.');
  },
);

// GET request to /video endpoint
sessionsRouter.get('/', videoController.fetchFiles, (req, res) => {
  res.status(200).send(res.locals.files);
});

// Export `sessionsRouter` for import into App.jsx
module.exports = sessionsRouter;
