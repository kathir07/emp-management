const Joi = require('joi')
const { objectId, endTimeNotBeforStartTime } = require('./custom.validation')

const createShiftTime = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        start_time: Joi.object().keys({
            hour: Joi.number().integer().min(1).max(12).required(),
            minutes: Joi.number().integer().min(0).max(59).required(),
            ampm: Joi.string().valid('AM', 'PM').required(),
        }).required(),
        end_time: Joi.object().keys({
            hour: Joi.number().integer().min(1).max(12).required(),
            minutes: Joi.number().integer().min(0).max(59).required(),
            ampm: Joi.string().valid('AM', 'PM').required(),
        }).custom(endTimeNotBeforStartTime).required(),
        break_time: Joi.object().keys({
            hour: Joi.number().integer().min(0).max(12).required(),
            minutes: Joi.number().integer().min(0).max(59).required(),
        }).required(),
        timezone: Joi.string().trim().required(),
        status: Joi.number().integer().optional().min(0).max(1),
    })
}

const getShiftTime = {
    params: Joi.object().keys({
        shiftTimeId: Joi.string().custom(objectId) 
     })
}

const updateShiftTime = {
    params: Joi.object().keys({
        shiftTimeId: Joi.string().custom(objectId) 
    }),

    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        start_time: Joi.object().keys({
            hour: Joi.number().integer().min(1).max(12).required(),
            minutes: Joi.number().integer().min(0).max(59).required(),
            ampm: Joi.string().valid('AM', 'PM').required(),
        }).required(),
        end_time: Joi.object().keys({
            hour: Joi.number().integer().min(1).max(12).required(),
            minutes: Joi.number().integer().min(0).max(59).required(),
            ampm: Joi.string().valid('AM', 'PM').required(),
        }).required(),
        break_time: Joi.object().keys({
            hour: Joi.number().integer().min(0).max(12).required(),
            minutes: Joi.number().integer().min(0).max(59).required(),
        }).required(),
        timezone: Joi.string().trim().required(),
        status: Joi.number().integer().optional().min(0).max(1),
    }).min(1),
}

const deleteShiftTime = {
    params: Joi.object().keys({
        shiftTimeId: Joi.string().custom(objectId) 
     })
}

module.exports = {createShiftTime, getShiftTime, updateShiftTime, deleteShiftTime}