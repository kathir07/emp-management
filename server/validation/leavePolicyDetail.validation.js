const Joi = require('joi')
const { objectId, dateFormat } = require('./custom.validation')

const createLeavePolicyDetail = {
    body: Joi.object().keys({
        leave_policy: Joi.string().custom(objectId).required(),
        start_date: Joi.custom(dateFormat).required(),
        end_date: Joi.custom(dateFormat).required(),
        total_earned_leave: Joi.number().integer().min(0),
        total_sick_leave: Joi.number().integer().min(0),
        total_optional_holiday: Joi.number().integer().min(0),
        max_cont_leave_count: Joi.number().integer().min(0),
        status: Joi.number().integer().optional().min(0).max(1)
    })
}

const getLeavePolicyDetail = {
    params: Joi.object().keys({
        leavePolicyDetailId: Joi.string().custom(objectId).required()
    })
}

const updateLeavePolicyDetail = {
    params: Joi.object().keys({
        leavePolicyDetailId: Joi.string().custom(objectId).required()
    }),
    body: Joi.object().keys({
        leave_policy: Joi.string().custom(objectId).required(),
        start_date: Joi.custom(dateFormat).required(),
        end_date: Joi.custom(dateFormat).required(),
        total_earned_leave: Joi.number().integer().min(0),
        total_sick_leave: Joi.number().integer().min(0),
        total_optional_holiday: Joi.number().integer().min(0),
        max_cont_leave_count: Joi.number().integer().min(0),
        status: Joi.number().required().optional().min(0).max(1)
    })
}

const deleteLeavePolicyDetail = {
    params: Joi.object().keys({
        leavePolicyDetailId: Joi.string().custom(objectId).required()
    })
}

module.exports = {createLeavePolicyDetail, getLeavePolicyDetail, updateLeavePolicyDetail, deleteLeavePolicyDetail}