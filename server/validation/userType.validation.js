const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createUserType = {
    body: Joi.object().keys({
        type: Joi.string().trim().required(),
        status: Joi.number().integer().optional().min(0).max(1),
    }) 
}

const getUserType = {
    params: Joi.object().keys({
        userTypeId: Joi.string().custom(objectId)
    })
}

const updateUserType = {
    params: Joi.object().keys({
        userTypeId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        type: Joi.string().trim().required(),
        status: Joi.number().integer().min(0).max(1),
    }).min(1)
}

const deleteUserType = {
    params: Joi.object().keys({
        userTypeId: Joi.string().custom(objectId)
    })
}

module.exports = {createUserType, getUserType, updateUserType, deleteUserType}
