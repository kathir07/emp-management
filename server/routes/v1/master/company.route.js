const express = require('express');
const { CompanyController } = require('../../../controllers');

const companyController = new CompanyController(); 


const router = express.Router();

router
    .route('/')
    .get(companyController.getCompanies)
    .post(companyController.createCompany)

router
    .route('/:companyId')
    .get(companyController.getCompanyById)
    .post(companyController.updateCompany)
    .delete(companyController.deleteCompany)


module.exports = router;