const httpStatus = require('../helpers/httpStatus')
const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");
const pick = require("../utils/pick")
const { companyService } =  require('../services');
const resMessage = require('../helpers/resMessage');

class CompanyController {
    constructor() {

    }

    createCompany = catchAsync(async(req, res) => {
        const company = await companyService.createCompany(req.body)
        sendResponse(res, httpStatus.CREATED, company, resMessage.COMPANY.CREATE_SUCCESS)
    })

    getCompanies = catchAsync(async(req, res) => {
        const filter = pick(req.query, [])
        const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
        const result = await companyService.queryCompanies(filter, options)
        sendResponse(res, httpStatus.SUCCESS, result);
    });

    getCompanyById = catchAsync(async(req, res) => {
        const company = await companyService.getCompanyById(req.params.companyId)
        sendResponse(res, httpStatus.SUCCESS, company)
    })

    updateCompany = catchAsync(async(req, res) => {
        const company = await companyService.updateCompanyById(req.params.companyId, req.body)
        sendResponse(res, httpStatus.OK, company, resMessage.COMPANY.UPDATE_SUCCESS);

    })

    deleteCompany = catchAsync(async(req, res) => {
        await companyService.deleteCompany(req.params.companyId);
        sendResponse(res, httpStatus.OK, '', resMessage.COMPANY.DELETE_SUCCESS);
    })
}

module.exports = CompanyController