const { regionService } = require('../services')
const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const sendResponse = require('../utils/sendResponse')

class RegionController {
    constructor() {

    }

    createRegion = catchAsync(async(req, res) => {
        const region = await regionService.createRegion(req.body)
        sendResponse(res, httpStatus.CREATED, region, 'Region Created Successfully!')
    });

    getRegions = catchAsync(async(req, res) =>{
        const filter = pick(req.query, [])
        const options = pick(req.query, [])
        const result = await regionService.queryRegions(filter, options);
        sendResponse(res, httpStatus.SUCCESS, result);
    })

    getRegionById = catchAsync(async(req, res) => {
        const region = await regionService.getRegionById(req.params.regionId)
        if(!region) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Region not found');
        }
        sendResponse(res, httpStatus.SUCCESS, region);
    })

    updateRegion = catchAsync(async(req, res) => {
        const region = await regionService.updateRegionById(req.params.regionId, req.body)
        sendResponse(res, httpStatus.OK, region, 'Region Updated Successfully!');
    })

    deleteRegion = catchAsync(async(req, res) => {
        await regionService.deleteRegionById(req.params.regionId)
        sendResponse(res, httpStatus.OK, '', 'Region Deleted Successfully!');
    })
}

module.exports = RegionController;


