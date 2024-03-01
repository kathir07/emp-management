const catchAsync = require("../utils/catchAsync");
const { userTypeService } = require('../services');
const sendResponse = require("../utils/sendResponse");
const httpStatus = require("../helpers/httpStatus");
const pick = require("../utils/pick");

class UserTypeController {
    constructor() {

    }

    createUserType = catchAsync(async(req, res) => {
        const userType = await userTypeService.createUserType(req.body);
        sendResponse(res, httpStatus.CREATED, userType, 'User Type Created Successfully!')
    })

    getUserTypes = catchAsync(async(req, res) => {
        const filter = pick(req.query, [])
        const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await userTypeService.queryUserTypes(filter, options)
        sendResponse(res, httpStatus.OK, result)
    })

    getUserTypeById = catchAsync(async(req, res) => {
        const userType = await userTypeService.getUserTypeById(req.params.userTypeId)
        sendResponse(res, httpStatus.OK, userType)
    })

    updateUserType = catchAsync(async(req, res) => {
        const userType = await userTypeService.updateUserTypeById(req.params.userTypeId, req.body)
        sendResponse(res, httpStatus.OK, userType, 'User Type Updated Successfully!')
    })

    deleteUserType = catchAsync(async(req, res) => {
        const userType = await userTypeService.deleteUserTypeById(req.params.userTypeId)
        sendResponse(res, httpStatus.OK, '', 'User Type Deleted Successfully!')
    })
}

module.exports = UserTypeController