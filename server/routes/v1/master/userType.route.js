const express =  require('express')
const { UserTypeController } =  require('../../../controllers')
const { userTypeValidator } = require('../../../validation')
const { validate } = require('../../../middlewares')

const router = express.Router()
const userTypeController = new UserTypeController()

router
    .route('/')
    .get(userTypeController.getUserTypes)
    .post(validate(userTypeValidator.createUserType), userTypeController.createUserType);

router
    .route('/:userTypeId')
    .get(validate(userTypeValidator.getUserType),userTypeController.getUserTypeById)
    .post(validate(userTypeValidator.updateUserType),userTypeController.updateUserType)
    .delete(validate(userTypeValidator.deleteUserType),userTypeController.deleteUserType)

module.exports = router;
     
