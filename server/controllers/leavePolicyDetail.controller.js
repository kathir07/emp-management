const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { leavePolicyDetailService } = require('../services')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick')
const sendResponse = require('../utils/sendResponse')

class LeavePolicyDetailController {
    constructor() {

    }

    createLeavePolicyDetail = catchAsync(async(req, res) => {
        const leavePolicyDetail = await leavePolicyDetailService.createLeavePolicyDetail(req.body)
        sendResponse(res, httpStatus.CREATED, leavePolicyDetail, resMessage.LEAVE_POLICY_DETAIL.CREATE_SUCCESS)
    })

    getLeavePolicyDetails = catchAsync(async(req, res) => {
        const filter = pick(req.query, [])
        const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await leavePolicyDetailService.queryLeavePolicyDetails(filter, options)
        sendResponse(res, httpStatus.OK, result)
    })

    getLeavePolicyDetailById = catchAsync(async(req, res) => {
        const leavePolicyDetail = await leavePolicyDetailService.getLeavePolicyDetailById(req.params.leavePolicyDetailId)
        sendResponse(res, httpStatus.OK, leavePolicyDetail)
    })

    updateLeavePolicyDetail = catchAsync(async(req, res) => {
        const leavePolicyDetail = await leavePolicyDetailService.updateLeavePolicyDetailById(req.params.leavePolicyDetailId, req.body)
        sendResponse(res, httpStatus.OK, leavePolicyDetail, resMessage.LEAVE_POLICY_DETAIL.UPDATE_SUCCESS)
    })

    deleteLeavePolicyDetail = catchAsync(async(req, res) => {
        const leavePolicyDetail = await leavePolicyDetailService.deleteLeavePolicyDetail(req.params.leavePolicyDetailId)
        sendResponse(res, httpStatus.OK, '', resMessage.LEAVE_POLICY_DETAIL.DELETE_SUCCESS)
    })
}

module.exports = LeavePolicyDetailController