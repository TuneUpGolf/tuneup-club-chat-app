const dotenv = require("dotenv");
dotenv.config();
const config = {
  /*
  |--------------------------------------------------------------------------
  | GENERAL: PORT
  |--------------------------------------------------------------------------
  */
  port: process.env.PORT,
  /*
  |--------------------------------------------------------------------------
  | DATABASE
  |--------------------------------------------------------------------------
  */
  databaseURL: process.env.MONGODB_URI,
  development_databaseURL: process.env.DEVELOPMENT_URI,
  secret: process.env.JWT_SECRET,
  environment: process.env.ENVIRONMENT,
  jwtExpire: process.env.JWT_EXPIRE,
  perPageRecord: 10,
  perPage: 10,
  /*
|--------------------------------------------------------------------------
| REDIS
|--------------------------------------------------------------------------
*/
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  /*
|--------------------------------------------------------------------------
| REDIS
|--------------------------------------------------------------------------
*/
  timeOutLimit: process.env.REQUEST_LIMIT_TIME,

  /*
  |--------------------------------------------------------------------------
  | AWS
  |--------------------------------------------------------------------------
  */
  aws: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    filePath: process.env.AWS_FILE_PATH,
  },
  /*
  |--------------------------------------------------------------------------
  | S3
  |--------------------------------------------------------------------------
  */
  s3: {
    bucket: process.env.S3_BUCKET,
    folder: process.env.S3_FOLDER,
  },


};

module.exports = { config };
