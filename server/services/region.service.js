const httpStatus =  require('../helpers/httpStatus')
const resMessage = require('../helpers/resMessage')
const { Region, Company } = require('../models')
const ApiError =  require('../utils/ApiError')

/**
 * Create Region
 * @param {ObjectBody} regionBody
 * @returns {Promise<Region>}
 */
const createRegion = async(regionBody) => {
    try {
       if(await Region.isNameTaken(regionBody.name)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.REGION.NAME_EXISTS);
       }

       if(await Region.isCodeTaken(regionBody.code)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.REGION.CODE_EXISTS);
       }

       return Region.create(regionBody);
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

/**
 * Query for Region
 * @param {Object} filter - Mongo Filter
 * @param {Object} options - Query Options
 * @param {String} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.page] - Current Page (default = 1)
 * @return {Promise<Query<Result>>}
 */
const queryRegions = async(filter, options) => {
    const regions = await Region.paginate(filter, options);
    return regions;
}

/**
 * Get Region by ID
 * @param {ObjectId} regionId
 * @returns {Promise<Region>}
 */
const getRegionById = async(regionId) => {
    const region = await Region.findOne({_id: regionId});

    if(!region) {
        throw new ApiError(httpStatus.NOT_FOUND, resMessage.REGION.NOT_FOUND);
    }
    
    return region;
}

/**
 * Update Region by ID
 * @param {ObjectId} regionId
 * @param {ObjectBody} regionBody
 * @returns {Promise<Result>}
 */
const updateRegionById = async(regionId, regionBody) => {
    try {

        const region = await Region.findOne({ _id: regionId });

        if(!region) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.REGION.NOT_FOUND);
        }
 
        if((regionBody) && await Region.isNameTaken(regionBody.name, regionId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.REGION.NAME_EXISTS);
       }

       if((regionBody) && await Region.isCodeTaken(regionBody.code, regionId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, resMessage.REGION.CODE_EXISTS);
       }

       Object.assign(region, regionBody);
       await region.save();
       return region;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}

/**
 * Delete Region by ID
 * @param {ObjectId} regionId
 * @returns {Promise<Result>}
 */
const deleteRegionById = async(regionId) => {
    try{
        const region = await Region.findOne({_id: regionId})
    
        if(!region) {
            throw new ApiError(httpStatus.NOT_FOUND, resMessage.REGION.NOT_FOUND);
        }
        
        // Delete Ref Docs.
        await Company.deleteMany({region: regionId})
        
        // Delete Region
        await region.deleteOne();
        return region;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
   
}


module.exports = {createRegion, queryRegions, getRegionById, updateRegionById, deleteRegionById}

