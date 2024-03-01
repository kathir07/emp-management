const express = require('express')
const {HolidayPolicyDetailController} = require('../../../controllers')
const { validate } = require('../../../middlewares')
const { holidayPolicyDetailValidator } = require('../../../validation')


const router = express.Router()
const holidayPolicyDetailController = new HolidayPolicyDetailController()

router
    .route('/')
    .get(holidayPolicyDetailController.getHolidayPolicyDetails)
    .post(validate(holidayPolicyDetailValidator.createHolidayPolicyDetail), holidayPolicyDetailController.createHolidayPolicyDetail)

router
    .route('/:holidayPolicyDetailId')
    .get(validate(holidayPolicyDetailValidator.getHolidayPolicyDetail), holidayPolicyDetailController.getHolidayPolicyDetailById)
    .post(validate(holidayPolicyDetailValidator.updateHolidayPolicyDetail), holidayPolicyDetailController.updateHolidayPolicyDetail)
    .delete(validate(holidayPolicyDetailValidator.deleteHolidayPolicyDetail), holidayPolicyDetailController.deleteHolidayPolicyDetail)

module.exports = router