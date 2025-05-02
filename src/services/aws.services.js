const AWS = require('aws-sdk');
const fs = require('fs');
const { config } = require('@config/index');
const ID = config.aws.key;
const SECRET = config.aws.secret;
const BUCKET_NAME = config.s3.bucket;
const REGION = config.aws.region;
const FILE_PATH = config.aws.filePath

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: REGION,
});

module.exports = {
    s3,
    /* UPLOADING FILE INTO S3 BUCKET */
    fileUpload: (fileName, groupName) => {
        try {
            if (fileName != null) {
                return new Promise((resolve, reject) => {
                    const fileContent = fs.readFileSync(process.env.PWD + '/resources/attachments/' + fileName);
                    const params = {
                        Bucket: BUCKET_NAME,
                        Key: `${FILE_PATH}${fileName}`,
                        Body: fileContent,
                        ACL: 'public-read',
                    };
                    s3.upload(params, (err, data) => {
                        if (err) {
                            reject(err); // Reject the promise on error
                            return;
                        }
                        const path = process.env.PWD + '/resources/attachments/' + fileName;
                        fs.unlink(path, (err) => {
                            if (err) reject(err); // Reject the promise on error
                        });
                        resolve(data);
                    });
                });
            } else {
                // Return a value explicitly if fileName is null
                return null; // Adjust the return value accordingly
            }
        } catch (error) {
            return error;
        }
    },
    /* FILE DOWNLOAD FROM AWS S3 BUCKET */
    fileDownloding: (fileKey) => {
        try {
            if (fileKey != null) {
                return new Promise((resolve, reject) => {
                    const s3 = new AWS.S3({
                        accessKeyId: ID,
                        secretAccessKey: SECRET,
                        region: REGION,
                    });
                    const options = {
                        Bucket: BUCKET_NAME,
                        Key: `${FILE_PATH}${fileKey}`,
                    };
                    s3.getObject(options, (err, data) => {
                        if (err) {
                            throw err;
                        } else {
                            const json = new Buffer(data.Body).toString("base64");
                            resolve(json);
                        }
                    });
                });
            }
        } catch (error) {
            return error;
        }
        return null;
    },
    /* FILE DELETE FROM AWS S3 BUCKET */
    deleteMultipleImages: (imagesKeys) => {
        try {
            return new Promise((resolve, reject) => {
                const paramsArray = imagesKeys.map(key => ({
                    Key: `${FILE_PATH}${key}`
                }));

                const params = {
                    Bucket: BUCKET_NAME,
                    Delete: {
                        Objects: paramsArray,
                        Quiet: false
                    }
                };

                // Delete Selected images
                s3.deleteObjects(params, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data);
                    }
                });
            });
        } catch (error) {
            return error;
        }
    }
}