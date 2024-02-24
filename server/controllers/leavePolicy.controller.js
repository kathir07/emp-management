
const httpStatus = require("../helpers/httpStatus");
const resMessage = require("../helpers/resMessage");
const { leavePolicyService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const sendResponse = require("../utils/sendResponse");

class LeavePolicyController {
    constructor() {

    }

    createLeavePolicy = catchAsync(async(req, res) => {
        const leavePolicy = await leavePolicyService.createLeavePolicy(req.body)
        sendResponse(res, httpStatus.CREATED, leavePolicy, resMessage.LEAVE_POLICY.CREATE_SUCCESS)
    })

    getLeavePolicies = catchAsync(async(req, res) => {
        const filters = pick(req.query, [])
        const option = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await leavePolicyService.queryLeavePolicies(filters, option)
        sendResponse(res, httpStatus.OK, result)
    })

    getLeavePolicyById = catchAsync(async(req, res) => {
        const leavePolicy = await leavePolicyService.getLeavePolicyById(req.params.leavePolicyId)
        sendResponse(res, httpStatus.OK, leavePolicy)
    })


    updateLeavePolicy = catchAsync(async(req, res) => {
        const leavePolicy = await leavePolicyService.updateLeavePolicyById(req.params.leavePolicyId, req.body)
        sendResponse(res, httpStatus.OK, leavePolicy, resMessage.LEAVE_POLICY.UPDATE_SUCCESS)
    })

    deleteLeavePolicy =  catchAsync(async(req, res) => {
        await leavePolicyService.deleteLeavePolicyById(req.params.leavePolicyId)
        sendResponse(req, httpStatus.OK, '', resMessage.LEAVE_POLICY.DELETE_SUCCESS)
    })
}

module.exports = LeavePolicyController