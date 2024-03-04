const { userService } = require("../services")
const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const catchAsync = require('../utils/catchAsync')
const pick = require('../utils/pick')
const sendResponse = require('../utils/sendResponse')

class UserController {
    constructor(){

    }

    createUser = catchAsync(async (req, res) => {
        const user = await userService.createUser(req.body)
        sendResponse(res, httpStatus.CREATED, user, resMessage.USER.CREATE_SUCCESS)
    })
}

module.exports = UserController