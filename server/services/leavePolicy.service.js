const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { LeavePolicy } = require("../models")
const ApiError = require('../utils/ApiError')

/**
 * Create New Leave Policy
 * @param {Object} leavePolicyBody
 * @returns {Promise<LeavePolicy>}
 */
const createLeavePolicy = async(leavePolicyBody) => {
    try {
        if(await LeavePolicy.isNameTaken(leavePolicyBody.name, leavePolicyBody.company)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY.NAME_EXISTS)
        }

        return await LeavePolicy.create(leavePolicyBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    } 
}

/**
 * Queries for Leave Policy
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Query<Result>} 
 */
const queryLeavePolicies = async(filter, options) => {
    const leavePolicies = await LeavePolicy.paginate(filter, options);
    return leavePolicies;
}

/**
 * Get Leave Policy details by id
 * @param {ObjectId} leavePolicyId
 * @returns {Promise<Result>}
 */
const getLeavePolicyById = async(leavePolicyId) => {
    const leavePolicy = await LeavePolicy.findOne({_id: leavePolicyId}).populate('company')
    
    if(!leavePolicy) {
        throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY.NOT_FOUND)
    }

    return leavePolicy;
}

/**
 * Update Leave Policy details using Id
 * @param {ObjectId} leavePolicyId
 * @param {Object} leavePolicyBody
 * @returns {Promise<Result>}
 */
const updateLeavePolicyById =  async(leavePolicyId, leavePolicyBody) => {
    try {
        const leavePolicy = await LeavePolicy.findOne({_id: leavePolicyId})

        if(!leavePolicy) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY.NOT_FOUND)
        }
    
        if(await LeavePolicy.isNameTaken(leavePolicyBody.name, leavePolicyBody.company, leavePolicyId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY.NAME_EXISTS)
        }
    
        Object.assign(leavePolicy, leavePolicyBody)
        Object.save();
        return leavePolicy
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Delete Leave policy by ID
 * @param {ObjectId} leavePolicyId
 * @returns {Promise<Result>}
 */
const deleteLeavePolicyById = async(leavePolicyId) => {
    try {
        const leavePolicy = await LeavePolicy.findOne({_id: leavePolicyId}).populate('company')
    
        if(!leavePolicy) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY.NOT_FOUND)
        }

        await leavePolicy.deleteOne();
        return leavePolicy;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = {createLeavePolicy, queryLeavePolicies, getLeavePolicyById,updateLeavePolicyById, deleteLeavePolicyById}