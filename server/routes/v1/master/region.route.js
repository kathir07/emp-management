const express = require('express')
const { RegionController } =  require('../../../controllers')
const { regionValidator } = require('../../../validation')
const { validate } = require('../../../middlewares')

const router = express.Router();
const regionController = new RegionController();

router
    .route('/')
    .get(regionController.getRegions)
    .post(validate(regionValidator.createRegion), regionController.createRegion);

router
    .route('/:regionId')
    .get(validate(regionValidator.getRegion) ,regionController.getRegionById)
    .post(validate(regionValidator.updateRegion), regionController.updateRegion)
    .delete(validate(regionValidator.deleteRegion),regionController.deleteRegion);

module.exports = router;