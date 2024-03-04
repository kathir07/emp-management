const express = require('express')
const { UserController } =  require('../../controllers')

const router = express.Router();
const userController = new UserController();

router
    .route('/')
    .post(userController.createUser);

module.exports = router;