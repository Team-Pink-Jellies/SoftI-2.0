const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const videoController = require('./controllers/videoController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const dbController = require('./controllers/dbController');

const { uploadFile, fetchFiles } = videoController;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

// allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

// POST request to /video endpoint
app.post('/video', upload.single('file'), uploadFile, (req, res) => {
  res.status(200).send('video uploaded');
});

// GET request to /video endpoint
app.get('/video', fetchFiles, (req, res) => {
  res.status(200).send(res.locals.videos);
});

// Unknown route handler
app.use((req, res) => {
  res.status(404).send('This is not the page you are looking for...');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
