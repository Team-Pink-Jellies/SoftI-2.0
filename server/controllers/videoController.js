const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIAULV76D667P5FRC7R',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const videoControllers = {};

videoControllers.uploadFile = async (req, res, next) => {
  if (req.file == null) {
    return res.status(400).json({ message: 'file not sent by the client' });
  }
  // console.log(req.file)
  const getNum = () => {
    return new Promise((resolve, reject) => {
      s3.listObjects({ Bucket: 'softi-nyoi2' }, function (err, result) {
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
    Bucket: 'softi-nyoi2',
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
  console.log('beginning fetchfiles');
  const params = {
    Bucket: 'softi-nyoi2',
  };
  //Retrieving an array of all the videos(objects) stored in the S3 Softi bucket. Identify the array's length to get the total number of videos.
  const getNum = () => {
    return new Promise((resolve, reject) => {
      s3.listObjects(params, function (err, result) {
        if (err) reject(err);

        if (result) resolve(result.Contents.length);
      });
    });
  };

  //Gets the specific video in our bucket
  const getObject = (i) => {
    const objParam = {
      Bucket: 'softi-nyoi2',
      Key: 'record_' + i + '.webm',
    };

    return new Promise((resolve, reject) => {
      s3.getObject(objParam, async function (err, result) {
        console.log('in promise');
        if (err) reject(err);
        if (result) resolve(result.Body);
      });
    });
  };
  console.log('after promise; ');
  console.log('before total videos');
  const totalVideos = await getNum();
  console.log(totalVideos);
  let array = [];
  console.log('after total videos');
  for (let i = 1; i <= totalVideos; i++) {
    let videoFile = await getObject(i);
    array.push(videoFile);
  }
  console.log(array);

  res.locals.videos = array;
  return next();
};
// get the numbers of files in the buckets
//   await s3.listObjects(params, function (err, data) {
//     if (err) throw err;
//     const num = data.Contents.length;
//     const files = [];

// for (let i = 1; i <= num; i++) {
//   const objParam = {
//     Bucket: "softi-nyoi2",
//     Key: "record_" + i + ".webm",
//   };
//   s3.getObject(objParam, async function (err, data) {
//     if (err) throw err;
//     const file = await data.Body;
//     files.push(file);
//   });
// }

// console.log(files);
//   });

// };

module.exports = videoControllers;
