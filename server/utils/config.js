require('dotenv').config({ path: './.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

module.exports = { MONGODB_URI, PORT };
