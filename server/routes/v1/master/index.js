const express =  require('express')
const locationRoute = require('./location.route')
const regionRoute = require('./region.route')
const companyRoute = require('./company.route')
const departmentRoute = require('./department.route')


const router = express.Router();

const masterRoutes = [
    {
        'path': '/location',
        'route': locationRoute
    },
    {
        'path': '/region',
        'route': regionRoute
    },
    {
        'path': '/company',
        'route': companyRoute
    },
    {
        'path': '/department',
        'route': departmentRoute
    }
]

masterRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router