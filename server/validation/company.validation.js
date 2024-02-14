const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createCompany = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        region: Joi.string().custom(objectId),
        location: Joi.string().custom(objectId),
        status: Joi.number().optional().min(0).min(1),
    })
}

const getCompany = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId)
    })
}

const updateCompany = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        region: Joi.string().custom(objectId),
        location: Joi.string().custom(objectId),
        status: Joi.number().optional().min(0).min(1),
    }).min(1),
}

const deleteCompany = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId)
    })
}

module.exports = {createCompany, getCompany, updateCompany, deleteCompany}