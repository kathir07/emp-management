const express = require('express');
const masterRoute = require('./master/index')
const adminRoute = require('./admin')

const router = express.Router();

const defaultRoutes = [ 
    {
        'path': '/master',
        'route': masterRoute
    },
    {
        
        'path': '/admin',
        'route': adminRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

module.exports = router;