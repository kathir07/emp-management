const httpStatus = require('http-status')
const { Company } = require('../models')

/**
 * Create Company
 * @param {Object} companyBody
 * @returns {Promise<Company>}
 */

const createCompany = async(companyBody) => {
    return Company.create(companyBody)
}