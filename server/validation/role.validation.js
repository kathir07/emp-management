const Joi = require('joi')
const {objectId} = require('./custom.validation')

const createRole = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        description: Joi.string().optional(),
        status: Joi.number().integer().optional().min(0).max(1),
    })
}

const getRole = {
    params: Joi.object().keys({
        roleId: Joi.string().custom(objectId)
    })
}

const updateRole = {
    params: Joi.object().keys({
        roleId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        description: Joi.string().optional(),
        status: Joi.number().integer().required().min(0).max(1),
    }).min(1)
}

const deleteRole = {
    params: Joi.object().keys({
        roleId: Joi.string().custom(objectId)
    })
}

module.exports = {createRole, getRole, updateRole, deleteRole}