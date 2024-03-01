const Joi = require('joi')
const {objectId, dateFormat} = require('./custom.validation')

const createHolidayPolicyDetail = {
    body:Joi.object().keys({
        holiday_policy: Joi.string().custom(objectId).required(),
        name: Joi.string().trim().required(),
        holiday_date: Joi.custom(dateFormat).required(),
        is_optional_holiday: Joi.number().integer().valid(0, 1).required(),
        status: Joi.number().integer().optional().min(0).max(1)
    })
}

const getHolidayPolicyDetail = {
    params: Joi.object().keys({
        holidayPolicyDetailId: Joi.string().custom(objectId).required()
    })
}

const updateHolidayPolicyDetail = {
    params: Joi.object().keys({
        holidayPolicyDetailId: Joi.string().custom(objectId).required()
    }),
    body:Joi.object().keys({
        holiday_policy: Joi.string().custom(objectId).required(),
        name: Joi.string().trim().required(),
        holiday_date: Joi.custom(dateFormat).required(),
        is_optional_holiday: Joi.number().integer().valid(0, 1).required(),
        status: Joi.number().integer().optional().min(0).max(1)
    }).min(1)
}

const deleteHolidayPolicyDetail = {
    params: Joi.object().keys({
        holidayPolicyDetailId: Joi.string().custom(objectId).required()
    })
}

module.exports = {createHolidayPolicyDetail, getHolidayPolicyDetail, updateHolidayPolicyDetail, deleteHolidayPolicyDetail}