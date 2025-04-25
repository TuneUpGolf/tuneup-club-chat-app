# Chat Application Server
This project was bootstrapped with Vme project.
# Prerequisite

### Server App
- Node.js (>= v18.17.1)
- MongoDB (>= v6.0.6)
- Redis   (>= v7.4.1)

### Server App Configuration
- Clone the project repository
- Go to project root directory
- Install package dependencies using `npm install` or `yarn install`
- Create .env file and Change the environment variables with your values
    - `PORT=4001` (you can change as per your requirement)

    - `ENVIRONMENT=XXXXX` (DEV/STAGE/PRODUCTION)
    - `MONGODB_URI=XXXXX` (Your Database URL)
    - `DEVELOPMENT_URI=XXXX` (Your Database URL for DEV/STAGE environment)

    - `JWT_SECRET=XXXX` (JWT Secret - any random string)
    - `JWT_EXPIRE=XXXXXX` (such as 1d for 1 day)

    - `AWS_ACCESS_KEY_ID=XXXXX`
    - `AWS_SECRET_ACCESS_KEY=XXXXX`
    - `AWS_REGION=XXXXX`
    - `S3_BUCKET=XXXX` 
    - `S3_FOLDER=XXXX`

    - `REDIS_HOST=XXXXXX`
    - `REDIS_PORT=XXXX`
    - `REDIS_PASSWORD=XXXX`

    - `API_RATE_LIMIT=XXXX` (Api rate limit for public api such as 30 )
    - `REQUEST_LIMIT_TIME=XXXX` (Time limit for Chat request to salesPerson, 2 for 2 minutes)
    - `FILE_SIZE=XXXX` (file size limit in bytes)

    - `FIREBASE_TYPE=XXXX` 
    - `FIREBASE_PROJECT_ID=XXXX`
    - `FIREBASE_PRIVATE_KEY_ID=XXXX`
    - `FIREBASE_CLIENT_EMAIL=XXXX`
    - `FIREBASE_PRIVATE_KEY=XXXX`
    - `FIREBASE_CLIENT_ID=XXXX`
    - `FIREBASE_AUTH_URI=XXXX`
    - `FIREBASE_TOKEN_URI=XXXX`
    - `FIREBASE_AUTH_PROVIDER_X509_CERT_URL=XXXX`
    - `FIREBASE_CLIENT_X509_CERT_URL=XXXX`
    - `FIREBASE_UNIVERSE_DOMAIN=XXXX`

### Folder Structure and Explanation of Each Folder

- **config/**: contains configurations file for various services such as logger,
               redis,firebase.

- **src/**: Contains folder for the core logic and implementation of the backend application.
  - **constants/**: Constants used throughout the app.
  - **controller/**: Functions that handle incoming requests and return responses.
  - **helper/**: Contains file for handling all incoming socket emits.
  - **middleware/**: Middleware functions for processing requests and handling authentication.
  - **models/**: Database models and schemas that define the structure of the data.
  - **routes/**: Route definitions for API endpoints.
  - **services/**: Contains db queries logic for each model.
  - **utils/**: General utility functions used across the application.
  - **validations/**:Schema and validation logic for request data to ensure integrity.
  
- **.env**: Contains environment variables.
- **package.json**: Describes project metadata and dependencies.
- **README.md**: Documentation for the project.
- **server.js**: The main entry point of the backend application.


### Running Application
- Install `PM2` on server globally using `npm install pm2 -g` or `yarn global add pm2`
- To run app in dev mode run `npm start` or `yarn start`
- To run app in production mode in background run `pm2 start server.js`
- To stop running app `pm2 stop server`

##### Note : If we are using pm2 then pm2 service need to restart to reflect the changes after we deployed.