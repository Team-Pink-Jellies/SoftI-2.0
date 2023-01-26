// Create a new app utilizing express
const express = require('express');
const app = express();
const config = require('./utils/config.js');
const mongoose = require('mongoose');

const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Import route files for /join, /login, and /video endpoints
const loginRouter = require('./routes/login.js');
const sessionsRouter = require('./routes/session.js');
const usersRouter = require('./routes/user.js');

// Connect to MongoDB database utilizing mongoose-provided connect method
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB...', error.message);
  });

// Configure cross-origin-resource-sharing options object
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    callback(null, true);
  },
};

// Enable cross-origin-resource-sharing middleware utilizing above configuration
app.use(cors(corsOptions));
app.use(
  cors({
    origin: 'http://localhost:8080',
  }),
);

// Enable parsing of json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable routers
app.use('/login', loginRouter);
app.use('/video', sessionsRouter);
app.use('/join', usersRouter);

// Unknown route handler
app.use('*', (req, res) => {
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

app.listen(config.PORT, () => {
  console.log(`Server listening on port: ${config.PORT}...`);
});
