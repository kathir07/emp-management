const httpStatus = require("../helpers/httpStatus")
const resMessage = require("../helpers/resMessage")
const { ShiftTime } = require("../models")
const ApiError = require("../utils/ApiError")

/**
 * Create New Shift Time
 * @param {Object} shiftTimeBody
 * @returns {Promise<ShiftTime>}
 */
const createShiftTime = async(shiftTimeBody) => {
    try {
        if(await ShiftTime.isNameTaken(shiftTimeBody.name, shiftTimeBody.company)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.SHIFT_TIME.NAME_EXISTS)
        }

        return await ShiftTime.create(shiftTimeBody);

    }catch(error) {
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
const queryShiftTimes = async(filter, options) => {
    const result = await ShiftTime.paginate(filter, options);
    return result;
}

/**
 * Get Shift Time details by ID
 * @param {ObjectId} shiftTimeId
 * @returns {Promise<Result>}
 */
const getShiftTimeById = async(shiftTimeId) => {
    const shiftTime = await ShiftTime.findOne({_id: shiftTimeId}).populate('company')
    if(!shiftTime) {
        throw new ApiError(httpStatus.BAD_REQUEST, resMessage.SHIFT_TIME.NOT_FOUND)
    }
    return shiftTime
}

/**
 * @param {ObjectId} shiftTimeId
 * @param {Object} shiftTimeBody
 * @returns {Promise<ShiftTime>} 
 */
const updateShiftTimeById = async(shiftTimeId, shiftTimeBody) => {
    try {
        const shiftTime = await ShiftTime.findOne({_id: shiftTimeId})

        if(!shiftTime) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.SHIFT_TIME.NOT_FOUND)
        }

        if(await ShiftTime.isNameTaken(shiftTimeBody.name, shiftTimeBody.company, shiftTimeId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.SHIFT_TIME.NAME_EXISTS)
        }

        Object.assign(shiftTime, shiftTimeBody);
        shiftTime.save();
        return shiftTime;

    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Delete Shit Time by Id
 * @param {ObjectId} shiftTimeId
 * @returns {Promise<Result>}
 */
const deleteShiftTimeById = async(shiftTimeId) => {
    const shiftTime = await ShiftTime.findOne({_id: shiftTimeId}).populate('company')
    if(!shiftTime) {
        throw new ApiError(httpStatus.BAD_REQUEST, resMessage.SHIFT_TIME.NOT_FOUND)
    }

    await shiftTime.deleteOne();
    return shiftTime;
}

module.exports = {createShiftTime, queryShiftTimes, getShiftTimeById, updateShiftTimeById, deleteShiftTimeById}


