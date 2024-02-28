const Joi = require('joi')
const { objectId } =  require('./custom.validation')

const createHolidayPolicy = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        status: Joi.number().integer().optional().min(0).max(1),
    })
}

const getHolidayPolicy = {
    params: Joi.object().keys({
       holidayPolicyId: Joi.string().custom(objectId) 
    })
}

const updateHolidayPolicy = {
    params: Joi.object().keys({
        holidayPolicyId: Joi.string().custom(objectId) 
    }),

    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        status: Joi.number().integer().optional().min(0).max(1),
    }).min(1),
}

const deleteHolidayPolicy = {
    params: Joi.object().keys({
        holidayPolicyId: Joi.string().custom(objectId) 
     })
}

module.exports = {createHolidayPolicy, getHolidayPolicy, updateHolidayPolicy, deleteHolidayPolicy}