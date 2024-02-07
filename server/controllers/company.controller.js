const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");

class CompanyController {
    constructor() {

    }

    createCompany = catchAsync(async(req, res) => {
        const company = await companyService.createCompany(req.body)
        sendResponse(res, httpStatus, company, 'Company Created Successfully!')
    })
}

module.exports = CompanyController