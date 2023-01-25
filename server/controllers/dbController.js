const db = require('../models/model.js');

const dbController = {};

dbController.getRecords = (req, res, next) => {
  const sqlString = 'Select * from testTable';
  console.log('getting all test records');
  db.query(sqlString)
    .then((data) => {
      console.log(data.rows);
      res.locals.allRecords = data.rows;
      return next();
    })
    .catch((err) => {
      console.log('error with getting all records');
    });
};

module.exports = dbController;
