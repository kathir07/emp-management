const express =  require('express')
const { LocationController }  = require('../../../controllers')
const {locationValidator} = require('../../../validation')
const { validate } = require('../../../middlewares')

const router = express.Router()
const locationController = new LocationController(); 

router
    .route('/')
    .post(validate(locationValidator.createLocation), locationController.createLocation)
    .get(locationController.getLocations);

router
    .route('/:locationId')
    .get(validate(locationValidator.getLocation), locationController.getLocationById)
    .post(validate(locationValidator.updateLocation), locationController.updateLocation)
    .delete(validate(locationValidator.deleteLocation),locationController.deleteLocation);

module.exports = router;