const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createRegion = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        currency: Joi.string().trim().required(),
        timezone: Joi.string().trim().required(),
        status: Joi.number().integer().optional().min(0).max(1),
    })
}

const getRegion = {
    params: Joi.object().keys({
        regionId: Joi.string().custom(objectId)
    })
}

const updateRegion = {
    params: Joi.object().keys({
        regionId: Joi.string().custom(objectId)
    }),
    
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        currency: Joi.string().trim().required(),
        timezone: Joi.string().trim().required(),
        status: Joi.number().integer().min(0).max(1),
    }).min(1),
}

const deleteRegion = {
    params: Joi.object().keys({
        regionId: Joi.string().custom(objectId)
    })
}

module.exports = {createRegion, getRegion, updateRegion, deleteRegion}