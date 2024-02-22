const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { UserType } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create New UserType
 * @param {Object} userTypeBody
 * @returns {Promise<UserType>}
 */
const createUserType = async(userTypeBody) => {
    try {
        if(await UserType.isTypeTaken(userTypeBody.type)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.USER_TYPE.TYPE_EXISTS)
        }
    
        return UserType.create(userTypeBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Query for UserType
 * @param {Object} filter
 * @param {Object} options
 * @param {String} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {Number} [options.page] - Current Page (default = 1)
 * @return {Promise<Query<Result>>}
 */
const queryUserTypes = async(filter, options) => {
    const userTypes = await UserType.paginate(filter, options)
    return userTypes
}

/**
 * Get UserType details by Id
 * @param {ObjectId} userTypeId
 * @returns {Promise<UserType>}
 */
const getUserTypeById = async(userTypeId) => {
    const userType = await UserType.findOne({_id: userTypeId});

    if(!userType) {
        throw new ApiError(httpStatus.BAD_REQUEST, resMessage.USER_TYPE.NOT_FOUND)
    }

    return userType;
}

/**
 * Update User Type details by Id
 * @param {ObjectId} userTypeId
 * @param {Object} userTypeBody
 * @returns {Promise<UserType>}
 */
const updateUserTypeById =  async(userTypeId, userTypeBody) => {
    try{
        const userType = await UserType.findOne({_id: userTypeId})
    
        if(!userType) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.USER_TYPE.NOT_FOUND)
        }

        if(await UserType.isTypeTaken(userTypeBody.type, userTypeId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.USER_TYPE.NOT_FOUND)
        }

        Object.assign(userType, userTypeBody);
       await userType.save();
       return userType;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
   
}

/**
 * Delete User Type by Id
 * @param {ObjectId} userTypeId
 * @returns {Promise<Result>}
 */
const deleteUserTypeById = async(userTypeId) => {
    try {
        const userType = await UserType.findOne({_id: userTypeId});

        if(!userType) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.USER_TYPE.NOT_FOUND)
        }
    
        await userType.deleteOne()
        return userType;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = {createUserType, queryUserTypes, getUserTypeById, updateUserTypeById, deleteUserTypeById}