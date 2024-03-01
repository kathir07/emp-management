const httpStatus = require("../helpers/httpStatus")
const resMessage = require("../helpers/resMessage")
const { HolidayPolicyDetail } = require("../models")
const ApiError = require("../utils/ApiError")


/**
 * Create New Holiday Policy Detail
 * @param {Object} holidayPolicyDetailBody
 * @return {Promise<HolidayPolicyDetail>}
 */
const createHolidayPolicyDetail = async(holidayPolicyDetailBody) => {
    try {
        if(await HolidayPolicyDetail.isActiveHolidayExists(holidayPolicyDetailBody.name, holidayPolicyDetailBody.holiday_date, holidayPolicyDetailBody.holiday_policy)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY_DETAIL.ACTIVE_EXISTS)
        }
    
        return await HolidayPolicyDetail.create(holidayPolicyDetailBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
  
}

/**
 * Query for Holiday Policy Detail
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @return {Promise<Query<Result>>}
 */
const queryHolidayPolicyDetails = async(filter, options) => {
    const holidayPolicyDetail = await HolidayPolicyDetail.paginate(filter, options)
    return holidayPolicyDetail;
}

/**
 * Get Holiday Policy Details by ID
 * @param {ObjectId} holidayPolicyDetailId
 * @param {Promise<Result>}
 */
const getHolidayPolicyDetailById = async(holidayPolicyDetailId) => {
    try {
        const holidayPolicyDetail = await HolidayPolicyDetail.findOne({_id: holidayPolicyDetailId}).populate('holiday_policy')
        if(!holidayPolicyDetail) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY_DETAIL.NOT_FOUND)
        }
        return holidayPolicyDetail
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Update Holiday Policy Detail by Id
 * @param {ObjectId} holidayPolicyDetailId
 * @param {Object} holidayPolicyDetailBody
 * @return {Promise<HolidayPolicyDetail>}
 */
const updateHolidayPolicyDetailById = async(holidayPolicyDetailId, holidayPolicyDetailBody) => {
    try {
        const holidayPolicyDetail = await HolidayPolicyDetail.findOne({_id: holidayPolicyDetailId})
        if(!holidayPolicyDetail) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY_DETAIL.NOT_FOUND)
        }

        if(await HolidayPolicyDetail.isActiveHolidayExists(holidayPolicyDetailBody.name, holidayPolicyDetailBody.holiday_date, holidayPolicyDetailBody.holiday_policy, holidayPolicyDetailId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY_DETAIL.ACTIVE_EXISTS)
        }

        Object.assign(holidayPolicyDetail, holidayPolicyDetailBody)
        holidayPolicyDetail.save()
        return holidayPolicyDetail

    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Delete Holiday Policy detail by Id
 * @param {ObjectId}
 * @return {Promise<Result>}
 */
const deleteHolidayPolicyDetail = async(holidayPolicyDetailId) => {
    try {
        const holidayPolicyDetail = await HolidayPolicyDetail.findOne({_id: holidayPolicyDetailId}).populate('holiday_policy')
        if(!holidayPolicyDetail) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY_DETAIL.NOT_FOUND)
        }
        await holidayPolicyDetail.deleteOne()
        return holidayPolicyDetail;

    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = {createHolidayPolicyDetail, queryHolidayPolicyDetails, getHolidayPolicyDetailById, updateHolidayPolicyDetailById, deleteHolidayPolicyDetail}