const express =  require('express')
const { validate } = require('../../../middlewares')
const { leavePolicyValidator } = require('../../../validation')
const { LeavePolicyController } = require('../../../controllers')

const router = express.Router()
const leavePolicyController = new LeavePolicyController()

router
    .route('/')
    .get(leavePolicyController.getLeavePolicies)
    .post(validate(leavePolicyValidator.createLeavePolicy), leavePolicyController.createLeavePolicy)

router
    .route('/:leavePolicyId')
    .get(validate(leavePolicyValidator.getLeavePolicy), leavePolicyController.getLeavePolicyById)
    .post(validate(leavePolicyValidator.updateLeavePolicy), leavePolicyController.updateLeavePolicy)
    .delete(validate(leavePolicyValidator.deleteLeavePolicy), leavePolicyController.deleteLeavePolicy)

module.exports = router