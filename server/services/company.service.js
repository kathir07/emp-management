const httpStatus = require('http-status')
const { Company } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * Create Company
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */

const createCompany = async(companyBody) => {
    try{
        if(await Company.isNameTaken(companyBody.name)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Name already exists')
        }
        if(await Company.isCodeTaken(companyBody.code)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Code already exists')
        }

        return Company.create(companyBody)
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
    
}

/**
 * Query for Companies
 * @param {Object} filter - mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortby] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Max.no of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Query<Result>} 
 */
const queryCompanies = async(filter, options) => {
    const companies = await Company.paginate(filter, options)
    return companies;
}

/**
 * Get Company by ID
 * @param {ObjectId} companyId
 * @returns {Promise<Company>}
 */
const getCompanyById =  async(companyId) => {
    const company = Company.findOne({_id: companyId}).populate('region').populate('location')
    return company;
}

/**
 * Update Company by ID
 * @param {ObjectId} companyId - Company Id
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async(companyId, companyBody) => {
    try {

        const company = await Company.findOne({ _id: companyId });

        if(!company) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
        }

        if(companyBody.name && await Company.isNameTaken(companyBody.name, companyId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Company Name already taken');
        }

        if(companyBody.code && await Company.isCodeTaken(companyBody.code, companyId)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Company Code already taken');
        }

        Object.assign(company, companyBody);
        await company.save();
        return company;

    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error)
    }
}

/**
 * Delete Company by ID
 * @param {ObjectId} companyId - Company Id
 * @returns {Promise<Result>}
 */
const deleteCompany =  async(companyId) => {
    try {
        const company = await Company.findById(companyId)

        if(!company) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Company not found')
        }

        await company.deleteOne();
        return company;
    } catch(error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
}
module.exports = {createCompany, queryCompanies, getCompanyById, updateCompanyById, deleteCompany}