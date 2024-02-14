const httpStatus = require('../helpers/httpStatus')
const resMessage =  require('../helpers/resMessage')
const { Location, Company } = require('../models')
const ApiError = require('../utils/ApiError')


/**
 * create Location
 * @param {Object} locationBody
 * @returns {Promise<Location>}
 */

const createLocation = async(locationBody) => {
    try {
        if(await Location.isNameTaken(locationBody.name)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LOCATION.NAME_EXISTS);
        }
        return Location.create(locationBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

/**
 * Query for locations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Query<Result>} 
 */
const queryLocations = async(filter, options) => {
    const locations = await Location.paginate(filter, options);
    return locations;
}

/** Get Location by ID 
 * @param {ObjectId} id
 * @returns {Promise<Location>} 
*/
const getLocationById = async(locationId) => {
    const location =  Location.findById(locationId); 
    if(!location) {
        throw new ApiError(httpStatus.NOT_FOUND, resMessage.LOCATION.NOT_FOUND);
    }
    return location
}

/** Update Location by ID
 * @param {ObjectId} id
 * @param {Object} locationBody
 * @returns {Promise<Result>}
 */
const updateLocationById = async(locationId, locationBody) => {
    try {
        const location = await Location.findOne({ _id: locationId });

        if(!location) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.LOCATION.NOT_FOUND);
        }

        if(locationBody.name && await Location.isNameTaken(locationBody.name, locationId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LOCATION.NAME_EXISTS);
        }

        Object.assign(location, locationBody);
        await location.save();
        return location;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
    
}

/**
 * Delete Location by Id
 * @param {ObjectId} Id
 * @returns {Promise<Result>}
 */
const deleteLocation = async(locationId) => {
    try {
        const location = await Location.findById(locationId);
        
        if(!location) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.LOCATION.NOT_FOUND)
        }

        // Delete Ref Docs.
        await Company.deleteMany({location: locationId})
    
        await location.deleteOne();
        return location;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}


module.exports = {createLocation, queryLocations, getLocationById, updateLocationById, deleteLocation}