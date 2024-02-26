
const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { shiftTimeService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick')
const sendResponse = require('../utils/sendResponse')

class ShiftTimeController {
    constructor() {

    }

    createShiftTime = catchAsync(async(req, res) => {
        const shiftTime = await shiftTimeService.createShiftTime(req.body)
        sendResponse(res, httpStatus.CREATED, shiftTime, resMessage.SHIFT_TIME.CREATE_SUCCESS)
    })

    getShiftTimes = catchAsync(async(req, res) => {
        const filters = pick(req.query, [])
        const option = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await shiftTimeService.queryShiftTimes(filters, option)
        sendResponse(res, httpStatus.OK, result)
    })

    getShiftTimeById = catchAsync(async(req, res) => {
        const shiftTime = await shiftTimeService.getShiftTimeById(req.params.shiftTimeId)
        sendResponse(res, httpStatus.OK, shiftTime)
    })

    updateShiftTime = catchAsync(async(req, res) => {
        const shiftTime = await shiftTimeService.updateShiftTimeById(req.params.shiftTimeId, req.body)
        sendResponse(res, httpStatus.OK, shiftTime, resMessage.SHIFT_TIME.UPDATE_SUCCESS)
    })

    deleteShiftTime = catchAsync(async(req, res) => {
        const shiftTime = await shiftTimeService.deleteShiftTimeById(req.params.shiftTimeId)
        sendResponse(res, httpStatus.OK, '', resMessage.SHIFT_TIME.DELETE_SUCCESS)
    })
}

module.exports = ShiftTimeController;