require('dotenv').config({ path: './.env' });

const PG_URI = process.env.PG_URI;
console.log('this is config file',PG_URI)

module.exports =  {PG_URI} ;
