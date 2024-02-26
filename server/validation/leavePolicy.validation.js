const Joi = require('joi')
const { objectId } =  require('./custom.validation')

const createLeavePolicy = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        status: Joi.number().integer().optional().min(0).max(1),
    })
}

const getLeavePolicy = {
    params: Joi.object().keys({
       leavePolicyId: Joi.string().custom(objectId) 
    })
}

const updateLeavePolicy = {
    params: Joi.object().keys({
        leavePolicyId: Joi.string().custom(objectId) 
    }),

    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        status: Joi.number().integer().optional().min(0).max(1),
    }).min(1),
}

const deleteLeavePolicy = {
    params: Joi.object().keys({
        leavePolicyId: Joi.string().custom(objectId) 
     })
}

module.exports = {createLeavePolicy, getLeavePolicy, updateLeavePolicy, deleteLeavePolicy}