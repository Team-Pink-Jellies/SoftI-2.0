const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const videoControllers = require('./controllers/videoControllers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const dbController = require('./controllers/dbControllers');

const { uploadFile, fetchFiles } = videoControllers;

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

app.get('/test', dbController.getRecords, (req, res) => {
  console.log('end of testing');
  res.status(200).json(res.locals.allRecords);
});

// GET request to /video endpoint
app.get('/video', fetchFiles, (req, res) => {
  res.status(200).send(res.locals.files);
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
