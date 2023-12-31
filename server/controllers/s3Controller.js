const { DeleteObjectCommand, S3Client }= require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid4 = require('uuid4');
const path = require('path');

require('dotenv').config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const allowedExtensions = ['.png', '.jpg', '.jpeg']

const storage = multerS3({
        s3: s3Client,
        acl: 'public-read-write',
        bucket: `${process.env.S3_BUCKET_NAME}`,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const extension = path.extname(file.originalname);
            if(!allowedExtensions.includes(extension)) {
                return callback(new Error('wrong extension'));
            }
            callback(null, `${Date.now().toString()}_${uuid4()}_${file.originalname}`);
        },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 * 5 },
    defaultValue: { path: '', mimetype: '' },
});

const deletePhoto = async (keyName) => {
    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: keyName,
    });
    
    try {
        const response = await s3Client.send(command);
        console.log(response);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { upload, deletePhoto };