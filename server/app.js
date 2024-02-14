const express = require('express')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
const routes = require('./routes/v1')
const ApiError = require('./utils/ApiError')
const httpStatus = require('./helpers/httpStatus')

const app = express()

//set security HTTP headers
app.use(helmet())

//parse json request body
app.use(express.json())

// parse url encoded in request body
app.use(express.urlencoded({ extended: true }))

//sanitize request data
app.use(mongoSanitize())

//enable cors
app.use(cors())
app.options('*', cors())

//v1 api routes
app.use('/api/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});



module.exports = app;



