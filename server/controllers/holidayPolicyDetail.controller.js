const httpStatus = require("../helpers/httpStatus");
const resMessage = require("../helpers/resMessage");
const { holidayPolicyDetailService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const sendResponse = require("../utils/sendResponse");

class HolidayPolicyDetailController {
    constructor() {

    }
    createHolidayPolicyDetail = catchAsync(async(req, res) => {
        const holidayPolicyDetail = await holidayPolicyDetailService.createHolidayPolicyDetail(req.body)
        sendResponse(res, httpStatus.CREATED, holidayPolicyDetail, resMessage.HOLIDAY_POLICY_DETAIL.CREATED)
    })

    getHolidayPolicyDetails = catchAsync(async(req, res) => {
        const filters = pick(req.query, [])
        const option = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await holidayPolicyDetailService.queryHolidayPolicyDetails(filters, option)
        sendResponse(res, httpStatus.OK, result)
    })

    getHolidayPolicyDetailById = catchAsync(async(req, res) => {
        const holidayPolicyDetail = await holidayPolicyDetailService.getHolidayPolicyDetailById(req.params.holidayPolicyDetailId)
        sendResponse(res, httpStatus.OK, holidayPolicyDetail)
    })

    updateHolidayPolicyDetail = catchAsync(async(req, res) => {
        const holidayPolicyDetail = await holidayPolicyDetailService.updateHolidayPolicyDetailById(req.params.holidayPolicyDetailId, req.body)
        sendResponse(res, httpStatus.OK, holidayPolicyDetail, resMessage.HOLIDAY_POLICY_DETAIL.UPDATE_SUCCESS)
    })

    deleteHolidayPolicyDetail = catchAsync(async(req, res) => {
        const holidayPolicyDetail = await holidayPolicyDetailService.deleteHolidayPolicyDetail(req.params.holidayPolicyDetailId)
        sendResponse(res, httpStatus.OK, '', resMessage.HOLIDAY_POLICY_DETAIL.DELETE_SUCCESS)
    })
}

module.exports = HolidayPolicyDetailController