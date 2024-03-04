const express = require('express')
const { RoleController } =  require('../../../controllers')
const { roleValidator } = require('../../../validation')
const { validate } = require('../../../middlewares')

const router = express.Router();
const roleController = new RoleController();

router
    .route('/')
    .get(roleController.getRoles)
    .post(validate(roleValidator.createRole), roleController.createRole);

router
    .route('/:roleId')
    .get(validate(roleValidator.getRole) ,roleController.getRoleById)
    .post(validate(roleValidator.updateRole), roleController.updateRole)
    .delete(validate(roleValidator.deleteRole),roleController.deleteRole);

module.exports = router;