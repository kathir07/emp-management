const httpStatus = require("../helpers/httpStatus");
const resMessage = require("../helpers/resMessage");
const { roleService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const sendResponse = require("../utils/sendResponse");

class RoleController {
    constructor() {

    }

    createRole = catchAsync(async (req, res) => {
        const role = await roleService.createRole(req.body)
        sendResponse(res, httpStatus.CREATED, role, resMessage.ROLE.CREATE_SUCCESS)
    })

    getRoles = catchAsync(async(req, res) => {
        const filter = pick(req.query, [])
        const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await roleService.queryRoles(filter, options)
        sendResponse(res, httpStatus.OK, result)
    })

    getRoleById = catchAsync(async(req, res) => {
        const role = await roleService.getRoleById(req.params.roleId);
        if(!role) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.ROLE.NOT_FOUND);
        }
        sendResponse(res, httpStatus.OK, role);
    })

    updateRole = catchAsync( async(req, res) => {
        const role = await roleService.updateRoleById(req.params.roleId, req.body);
        sendResponse(res, httpStatus.OK, role, resMessage.ROLE.UPDATE_SUCCESS);
    })

    deleteRole = catchAsync(async(req, res) => {
        await roleService.deleteRoleById(req.params.roleId);
        sendResponse(res, httpStatus.OK, '', resMessage.ROLE.DELETE_SUCCESS);
    })

}

module.exports = RoleController