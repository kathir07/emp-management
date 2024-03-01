const express = require('express')
const { LeavePolicyDetailController } = require('../../../controllers')
const { validate } = require('../../../middlewares')
const { leavePolicyDetailValidator } = require('../../../validation')

const router = express.Router()
const leavePolicyDetailController = new LeavePolicyDetailController()

router
    .route('/')
    .get(leavePolicyDetailController.getLeavePolicyDetails)
    .post(validate(leavePolicyDetailValidator.createLeavePolicyDetail), leavePolicyDetailController.createLeavePolicyDetail)

router
    .route('/:leavePolicyDetailId')
    .get(validate(leavePolicyDetailValidator.getLeavePolicyDetail), leavePolicyDetailController.getLeavePolicyDetailById)
    .post(validate(leavePolicyDetailValidator.updateLeavePolicyDetail), leavePolicyDetailController.updateLeavePolicyDetail)
    .delete(validate(leavePolicyDetailValidator.deleteLeavePolicyDetail), leavePolicyDetailController.deleteLeavePolicyDetail)

module.exports = router;
