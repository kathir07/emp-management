const express =  require('express')
const { DepartmentController } = require('../../../controllers')
const { validate } =  require('../../../middlewares')
const { departmentValidator } = require('../../../validation')

const router =  express.Router()
const departmentController =  new DepartmentController()

router
    .route('/')
    .get(departmentController.getDepartments)
    .post(validate(departmentValidator.createDepartment), departmentController.createDepartment);

router
    .route('/:departmentId')
    .get(validate(departmentValidator.getDepartment), departmentController.getDepartmentById)
    .post(validate(departmentValidator.updateDepartment), departmentController.updateDepartment)
    .delete(validate(departmentValidator.deleteDepartment), departmentController.deleteDepartment);

module.exports = router;


