const express = require('express');
const masterRoute = require('./master/index')

const router = express.Router();

const defaultRoutes = [ 
    {
        'path': '/master',
        'route': masterRoute
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
});

module.exports = router;