const {Role} = require('../models')
const ApiError = require('../utils/ApiError')
const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')

/**
 * Create New Role
 * @param {Object} roleBody
 * @return {Promise<Role>}
 */
const createRole = async(roleBody) => {
    try {
        if(await Role.isNameTaken(roleBody.name)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.ROLE.NAME_EXISTS)
        }
        return await Role.create(roleBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Query for Role
 * @param {Object} filter - Mongo Filter
 * @param {Object} options - Query Options
 * @param {String} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.page] - Current Page (default = 1)
 * @return {Promise<Query<Result>>}
 */
const queryRoles = async(filter, options) => {
    const roles = await Role.paginate(filter, options);
    return roles;
}

/**
 * Get Role by ID
 * @param {ObjectId} roleId
 * @returns {Promise<Role>}
 */
const getRoleById = async(roleId) => {
    const role = await Role.findOne({_id: roleId});

    if(!role) {
        throw new ApiError(httpStatus.NOT_FOUND, resMessage.ROLE.NOT_FOUND);
    }
    
    return role;
}

/**
 * Update Role by ID
 * @param {ObjectId} roleId
 * @param {ObjectBody} roleBody
 * @returns {Promise<Result>}
 */
const updateRoleById = async(roleId, roleBody) => {
    try {

        const role = await Role.findOne({ _id: roleId });

        if(!role) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.ROLE.NOT_FOUND);
        }
 
        if((roleBody) && await Role.isNameTaken(roleBody.name, roleId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.ROLE.NAME_EXISTS);
       }

       Object.assign(role, roleBody);
       await role.save();
       return role;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

/**
 * Delete Role by ID
 * @param {ObjectId} roleId
 * @returns {Promise<Result>}
 */
const deleteRoleById = async(roleId) => {
    try{
        const role = await Role.findOne({_id: roleId})
    
        if(!role) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.ROLE.NOT_FOUND);
        }
        
        // Delete Region
        await role.deleteOne();
        return role;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

module.exports = {createRole, queryRoles, updateRoleById, deleteRoleById, getRoleById}
