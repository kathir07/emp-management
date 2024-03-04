const {User} = require('../models')
const ApiError = require('../utils/ApiError')
const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')

/**
 * Create New User
 * @param {Object} userBody
 * @return {Promise<Role>}
 */
const createUser = async(userBody) => {
    try {
        return await User.create(userBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = {createUser}