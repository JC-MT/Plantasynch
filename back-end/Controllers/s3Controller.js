const express = require('express')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');

const images = express.Router();
require('dotenv').config();

const accessKeyId =  process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION 
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  })

images.post('/posts', upload.single('image'), async(req, res) => {

    const params = {
        Bucket: bucketName,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    
    res.send({})
})

images.delete('/delete', async(req, res) => {

    res.send({})
})


module.exports = images;