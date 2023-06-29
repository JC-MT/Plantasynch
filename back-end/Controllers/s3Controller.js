import { express } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';

const images = express.Router();
require('dotenv').config();

const awsBucketName =  process.env.AWS_ACCESS_KEY
const awsAccessKey = process.env.AWS_SECRET_KEY
const awsSecretKey = process.env.AWS_BUCKET_NAME
const awsBucketRegion = process.env.AWS_BUCKET_REGION 
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

images.post('/posts', upload.single('image'), async(req, res) => {

    res.send({})
})

images.delete('/delete', async(req, res) => {

    res.send({})
})


module.export = images;