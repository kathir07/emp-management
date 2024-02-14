const express = require('express');
const { CompanyController } = require('../../../controllers');
const { companyValidator } = require('../../../validation')
const { validate } = require('../../../middlewares')

const companyController = new CompanyController(); 


const router = express.Router();

router
    .route('/')
    .get(companyController.getCompanies)
    .post(validate(companyValidator.createCompany), companyController.createCompany)

router
    .route('/:companyId')
    .get(validate(companyValidator.getCompany), companyController.getCompanyById)
    .post(validate(companyValidator.updateCompany), companyController.updateCompany)
    .delete(validate(companyValidator.deleteCompany), companyController.deleteCompany)


module.exports = router;