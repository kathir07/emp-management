
const httpStatus = require("../helpers/httpStatus");
const resMessage = require("../helpers/resMessage");
const { holidayPolicyService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const sendResponse = require("../utils/sendResponse");

class HolidayPolicyController {
    constructor() {

    }

    createHolidayPolicy = catchAsync(async(req, res) => {
        const holidayPolicy = await holidayPolicyService.createHolidayPolicy(req.body)
        sendResponse(res, httpStatus.CREATED, holidayPolicy, resMessage.HOLIDAY_POLICY.CREATE_SUCCESS)
    })

    getHolidayPolicies = catchAsync(async(req, res) => {
        const filters = pick(req.query, [])
        const option = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await holidayPolicyService.queryHolidayPolicies(filters, option)
        sendResponse(res, httpStatus.OK, result)
    })

    getHolidayPolicyById = catchAsync(async(req, res) => {
        const holidayPolicy = await holidayPolicyService.getHolidayPolicyById(req.params.holidayPolicyId)
        sendResponse(res, httpStatus.OK, holidayPolicy)
    })


    updateHolidayPolicy = catchAsync(async(req, res) => {
        const holidayPolicy = await holidayPolicyService.updateHolidayPolicyById(req.params.holidayPolicyId, req.body)
        sendResponse(res, httpStatus.OK, holidayPolicy, resMessage.HOLIDAY_POLICY.UPDATE_SUCCESS)
    })

    deleteHolidayPolicy =  catchAsync(async(req, res) => {
        await holidayPolicyService.deleteHolidayPolicyById(req.params.holidayPolicyId)
        sendResponse(res, httpStatus.OK, '', resMessage.HOLIDAY_POLICY.DELETE_SUCCESS)
    })
}

module.exports = HolidayPolicyController