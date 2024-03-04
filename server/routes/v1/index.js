const express = require('express');
const masterRoute = require('./master/index')
const adminRoute = require('./admin')
const userRoute = require('./user.route')

const router = express.Router();

const defaultRoutes = [ 
    {
        'path': '/master',
        'route': masterRoute
    },
    {
        
        'path': '/admin',
        'route': adminRoute
    },
    {
        'path': '/user',
        'route': userRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

module.exports = router;