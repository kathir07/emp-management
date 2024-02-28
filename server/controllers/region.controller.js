const { regionService } = require('../services')
const httpStatus =  require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick')
const ApiError = require('../utils/ApiError')
const sendResponse = require('../utils/sendResponse')

class RegionController {
    constructor() {

    }

    createRegion = catchAsync(async(req, res) => {
        const region = await regionService.createRegion(req.body)
        sendResponse(res, httpStatus.CREATED, region, resMessage.REGION.CREATE_SUCCESS)
    });

    getRegions = catchAsync(async(req, res) =>{
        const filter = pick(req.query, [])
        const options = pick(req.query,  ['sortBy', 'limit', 'page', 'populate'])
        const result = await regionService.queryRegions(filter, options);
        sendResponse(res, httpStatus.OK, result);
    })

    getRegionById = catchAsync(async(req, res) => {
        const region = await regionService.getRegionById(req.params.regionId)
        if(!region) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.REGION.NOT_FOUND);
        }
        sendResponse(res, httpStatus.OK, region);
    })

    updateRegion = catchAsync(async(req, res) => {
        const region = await regionService.updateRegionById(req.params.regionId, req.body)
        sendResponse(res, httpStatus.OK, region, resMessage.REGION.UPDATE_SUCCESS);
    })

    deleteRegion = catchAsync(async(req, res) => {
        await regionService.deleteRegionById(req.params.regionId)
        sendResponse(res, httpStatus.OK, '', resMessage.REGION.DELETE_SUCCESS);
    })
}

module.exports = RegionController;


