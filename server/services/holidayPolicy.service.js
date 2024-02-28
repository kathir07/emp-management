const httpStatus = require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { HolidayPolicy } = require("../models")
const ApiError = require('../utils/ApiError')

/**
 * Create New Holiday Policy
 * @param {Object} holidayPolicyBody
 * @returns {Promise<HolidayPolicy>}
 */
const createHolidayPolicy = async(holidayPolicyBody) => {
    try {
        if(await HolidayPolicy.isNameTaken(holidayPolicyBody.name, holidayPolicyBody.company)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY.NAME_EXISTS)
        }

        return await HolidayPolicy.create(holidayPolicyBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    } 
}

/**
 * Queries for Holiday Policy
 * @param {Object} filter
 * @param {Object} options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Query<Result>} 
 */
const queryHolidayPolicies = async(filter, options) => {
    const holidayPolicies = await HolidayPolicy.paginate(filter, options);
    return holidayPolicies;
}

/**
 * Get Holiday Policy details by id
 * @param {ObjectId} holidayPolicyId
 * @returns {Promise<Result>}
 */
const getHolidayPolicyById = async(holidayPolicyId) => {
    const holidayPolicy = await HolidayPolicy.findOne({_id: holidayPolicyId}).populate('company')
    
    if(!holidayPolicy) {
        throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY.NOT_FOUND)
    }

    return holidayPolicy;
}

/**
 * Update Holiday Policy details using Id
 * @param {ObjectId} holidayPolicyId
 * @param {Object} holidayPolicyBody
 * @returns {Promise<Result>}
 */
const updateHolidayPolicyById =  async(holidayPolicyId, holidayPolicyBody) => {
    try {
        const holidayPolicy = await HolidayPolicy.findOne({_id: holidayPolicyId})

        if(!holidayPolicy) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY.NOT_FOUND)
        }
    
        if(await HolidayPolicy.isNameTaken(holidayPolicyBody.name, holidayPolicyBody.company, holidayPolicyId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY.NAME_EXISTS)
        }
    
        Object.assign(holidayPolicy, holidayPolicyBody)
        holidayPolicy.save();
        return holidayPolicy
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Delete Holiday policy by ID
 * @param {ObjectId} holidayPolicyId
 * @returns {Promise<Result>}
 */
const deleteHolidayPolicyById = async(holidayPolicyId) => {
    try {
        const holidayPolicy = await HolidayPolicy.findOne({_id: holidayPolicyId}).populate('company')
    
        if(!holidayPolicy) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.HOLIDAY_POLICY.NOT_FOUND)
        }

        await holidayPolicy.deleteOne();
        return holidayPolicy;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

module.exports = {createHolidayPolicy, queryHolidayPolicies, getHolidayPolicyById,updateHolidayPolicyById, deleteHolidayPolicyById}