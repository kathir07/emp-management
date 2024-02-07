const express = require('express');
const { CompanyController } = require('../../../controllers');


const router = express.Router();

router
    .route('/')
    .get(CompanyController.getCompanies)
    .post(CompanyController.createCompany)

router
    .route('/:companyId')
    .get(CompanyController.getCompanyById)
    .post(CompanyController.updateCompany)
    .delete(CompanyController.deleteCompany)


module.exports = router;