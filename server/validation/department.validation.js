const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createDepartment = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        status: Joi.number().integer().optional().min(0).max(1),
    })
}

const getDepartment = {
    params: Joi.object().keys({
        departmentId: Joi.string().custom(objectId)
    })
}

const updateDepartment = {
    params: Joi.object().keys({
        departmentId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        company: Joi.string().custom(objectId),
        status: Joi.number().integer().min(0).max(1),
    }).min(1),
}

const deleteDepartment = {
    params: Joi.object().keys({
        departmentId: Joi.string().custom(objectId)
    })
}

module.exports = {createDepartment, getDepartment, updateDepartment, deleteDepartment}