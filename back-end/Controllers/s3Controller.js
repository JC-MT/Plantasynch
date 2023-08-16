const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { randomBytes } = require('node:crypto');
const images = express.Router();
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

images.post('/posts', upload.single('image'), async (req, res) => {
  const uniqueKey = randomBytes(32).toString('hex');

  const params = {
    Bucket: bucketName,
    Key: uniqueKey,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  const command = new PutObjectCommand(params);
  const { $metadata } = await s3Client.send(command);

  if ($metadata.httpStatusCode === 200) {
    res.status(200).json({ success: true, imageKey: uniqueKey });
  } else {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: 'Image was not uploaded'
    });
  }
});

module.exports = images;
