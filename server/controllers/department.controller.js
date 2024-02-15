const catchAsync =  require('../utils/catchAsync')
const { departmentService } = require('../services');
const sendResponse = require('../utils/sendResponse');
const pick =  require('../utils/pick')
const httpStatus = require('../helpers/httpStatus');
const resMessage = require('../helpers/resMessage')

class DepartmentController {
    
    constructor() {

    }

    createDepartment = catchAsync(async(req, res) => {
        const department = await departmentService.createDepartment(req.body);
        sendResponse(res, httpStatus.CREATED, department, resMessage.DEPARTMENT.CREATE_SUCCESS)
    })

    getDepartments = catchAsync(async(req, res) => {
        const filter = pick(req.query, [])
        const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        console.log(options)
        const result = await departmentService.queryDepartments(filter, options)
        sendResponse(res, httpStatus.SUCCESS, result);
    })

    getDepartmentById = catchAsync(async(req, res) => {
        const department = await departmentService.getDepartmentById(req.params.departmentId)
        sendResponse(res, httpStatus.SUCCESS, department)
    })

    updateDepartment = catchAsync(async(req, res) => {
        const department = await departmentService.updateDepartmentById(req.params.departmentId, req.body)
        sendResponse(res, httpStatus.OK, department, resMessage.DEPARTMENT.UPDATE_SUCCESS);

    })

    deleteDepartment = catchAsync(async(req, res) => {
        await departmentService.deleteDepartment(req.params.departmentId);
        sendResponse(res, httpStatus.OK, '', resMessage.DEPARTMENT.DELETE_SUCCESS);
    })
    
}

module.exports = DepartmentController