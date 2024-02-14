const { locationService } = require('../services')
const httpStatus =  require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');

class LocationController {
    constructor() {

    }

    createLocation = catchAsync(async(req, res) => {
        const location = await locationService.createLocation(req.body);
        sendResponse(res, httpStatus.CREATED, location, resMessage.LOCATION.CREATE_SUCCESS);
    });

    getLocations = catchAsync(async(req, res) => {
        const filter = pick(req.query, [])
        const options = pick(req.query, [])
        const result = await locationService.queryLocations(filter, options)
        sendResponse(res, httpStatus.SUCCESS, result);
    });

    getLocationById = catchAsync( async(req, res) => {
        const location = await locationService.getLocationById(req.params.locationId);
        if(!location) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.LOCATION.NOT_FOUND);
        }
        sendResponse(res, httpStatus.SUCCESS, location);
    })

    updateLocation = catchAsync( async(req, res) => {
        const location = await locationService.updateLocationById(req.params.locationId, req.body);
        sendResponse(res, httpStatus.OK, location, resMessage.LOCATION.UPDATE_SUCCESS);
    })

    deleteLocation = catchAsync(async(req, res) => {
        await locationService.deleteLocation(req.params.locationId);
        sendResponse(res, httpStatus.OK, '', resMessage.LOCATION.DELETE_SUCCESS);
    })
    
}

module.exports = LocationController

