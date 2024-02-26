const express = require('express')
const validate = require('../../../middlewares/validate')
const { shiftTimeValidator } = require('../../../validation')
const { ShiftTimeController } = require('../../../controllers')

const router = express.Router()
const shiftTimeController = new ShiftTimeController()

router
    .route('/')
    .get(shiftTimeController.getShiftTimes)
    .post(validate(shiftTimeValidator.createShiftTime), shiftTimeController.createShiftTime);

router
    .route('/:shiftTimeId')
    .get(validate(shiftTimeValidator.getShiftTime), shiftTimeController.getShiftTimeById)
    .post(validate(shiftTimeValidator.updateShiftTime), shiftTimeController.updateShiftTime)
    .delete(validate(shiftTimeValidator.deleteShiftTime), shiftTimeController.deleteShiftTime)

module.exports = router;