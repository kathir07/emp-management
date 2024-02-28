const express =  require('express')
const { validate } = require('../../../middlewares')
const { holidayPolicyValidator } = require('../../../validation')
const { HolidayPolicyController } = require('../../../controllers')

const router = express.Router()
const holidayPolicyController = new HolidayPolicyController()

router
    .route('/')
    .get(holidayPolicyController.getHolidayPolicies)
    .post(validate(holidayPolicyValidator.createHolidayPolicy), holidayPolicyController.createHolidayPolicy)

router
    .route('/:holidayPolicyId')
    .get(validate(holidayPolicyValidator.getLeavePolicy), holidayPolicyController.getHolidayPolicyById)
    .post(validate(holidayPolicyValidator.updateLeavePolicy), holidayPolicyController.updateHolidayPolicy)
    .delete(validate(holidayPolicyValidator.deleteLeavePolicy), holidayPolicyController.deleteHolidayPolicy)

module.exports = router