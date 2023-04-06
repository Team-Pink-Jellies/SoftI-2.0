const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const videoControllers = {};

videoControllers.uploadFile = async (req, res, next) => {
  if (req.file == null) {
    return res.status(400).json({ message: 'file not sent by the client' });
  }
  // console.log(req.file)
  const getNum = () => {
    return new Promise((resolve, reject) => {
      s3.listObjects({ Bucket: process.env.S3_BUCKET_NAME }, function (err, result) {
        if (err) reject(err);
        if (result) resolve(result.Contents.length);
      });
    });
  };

  let num = (await getNum()) + 1;

  const file = req.file;
  //const extension = /[^.]+$/.exec(file.originalname)[0];
  file.originalname = `${req.query.title}_${req.query.image}.webm`;
  const fileStream = fs.createReadStream(file.path);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `record_${num}.webm`,
    Body: fileStream,
  };
  await s3.upload(params, function (err, data) {
    if (err) {
      next({
        log: 'error while upload image to s3',
        status: 500,
        message: err,
      });
    }
  });

  next();
};

videoControllers.fetchFiles = async (req, res, next) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
  };

  const getNum = () => {
    return new Promise((resolve, reject) => {
      s3.listObjects(params, function (err, result) {
        if (err) reject(err);
        if (result) resolve(result.Contents.length);
      });
    });
  };

  const getObject = (i) => {
    const objParam = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'record_' + i + '.webm',
    };

    return new Promise((resolve, reject) => {
      s3.getObject(objParam, async function (err, result) {
        if (err) reject(err);
        if (result) resolve(result.Body);
      });
    });
  };

  const num = await getNum();
  let array = [];

  for (let i = 1; i <= num; i++) {
    let file = await getObject(i);
    array.push(file);
  }

  res.locals.files = array;
  next();
};

module.exports = videoControllers;
