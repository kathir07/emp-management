const Joi = require('joi');
const { objectId } = require('./custom.validation')

const createLocation = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        code: Joi.string().trim().required(),
        status: Joi.number().integer().optional().min(0).max(1), 
    })
}

const getLocation = {
    params : Joi.object().keys({
        locationId: Joi.string().custom(objectId)
    })
}

const updateLocation = {
    params : Joi.object().keys({
        locationId: Joi.string().custom(objectId)
    }),
    body : Joi.object().keys({
        name: Joi.string().trim(),
        code: Joi.string().trim(),
        status: Joi.number().integer().min(0).max(1),  
    })
    .min(1),
}

const deleteLocation = {
    params: Joi.object().keys({
        locationId: Joi.string().custom(objectId)
    })
}



module.exports = {createLocation, getLocation, updateLocation, deleteLocation}