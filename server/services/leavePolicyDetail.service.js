const httpStatus = require("../helpers/httpStatus")
const resMessage = require("../helpers/resMessage")
const { LeavePolicyDetail } = require("../models")
const ApiError = require("../utils/ApiError")

/**
 * Create New Leave Policy detail
 * @param {Object} leavePolicyDetailBody
 * @return {Promise<LeavePolicyDetail>}
 */
const createLeavePolicyDetail = async(leavePolicyDetailBody) => {
    try{
        if(await LeavePolicyDetail.isActiveLeaveDetailExists(leavePolicyDetailBody.leave_policy)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY_DETAIL.ACTIVE_EXISTS)
        }

        return await LeavePolicyDetail.create(leavePolicyDetailBody)
    } catch(error){
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Query for Leave Policy Detail
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @return {Promise<Query<Result>>}
 */
const queryLeavePolicyDetails = async(filter, options) => {
    const leavePolicyDetails = await LeavePolicyDetail.paginate(filter, options)
    return leavePolicyDetails;
}

/**
 * Get Leave Policy Details by ID
 * @param {ObjectId} leavePolicyDetailId
 * @return {Promise<Result>}
 */
const getLeavePolicyDetailById = async(leavePolicyDetailId) => {
    try{
        const leavePolicyDetail = await LeavePolicyDetail.findOne({_id: leavePolicyDetailId}).populate('leave_policy')

        if(!leavePolicyDetail) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY_DETAIL.NOT_FOUND)
        }
    
        return leavePolicyDetail;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
   
}

/**
 * Update Leave Policy Detail by Id
 * @param {ObjectId} leavePolicyDetailId
 * @param {Object} leavePolicyDetailBody
 * @return {Promise<LeavePolicyDetail>}
 */
const updateLeavePolicyDetailById = async(leavePolicyDetailId, leavePolicyDetailBody) => {
    try {
        const leavePolicyDetail = await LeavePolicyDetail.findOne({_id: leavePolicyDetailId}).populate('leave_policy')

        if(!leavePolicyDetail) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY_DETAIL.NOT_FOUND)
        }

        if(await LeavePolicyDetail.isActiveLeaveDetailExists(leavePolicyDetailBody.leave_policy, leavePolicyDetailId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY_DETAIL.ACTIVE_EXISTS)
        }

        Object.assign(leavePolicyDetail, leavePolicyDetailBody)
        leavePolicyDetail.save()
        return leavePolicyDetail
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
    
}

/**
 * Delete Leave Policy detail by Id
 * @param {ObjectId}
 * @return {Promise<Result>}
 */
const deleteLeavePolicyDetail = async(leavePolicyDetailId) => {
    try {
        const leavePolicyDetail = await LeavePolicyDetail.findOne({_id: leavePolicyDetailId}).populate('leave_policy')

        if(!leavePolicyDetail) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LEAVE_POLICY_DETAIL.NOT_FOUND)
        }

        await leavePolicyDetail.deleteOne();
        return leavePolicyDetail;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
    
}

module.exports = {createLeavePolicyDetail, queryLeavePolicyDetails, getLeavePolicyDetailById, updateLeavePolicyDetailById, deleteLeavePolicyDetail}