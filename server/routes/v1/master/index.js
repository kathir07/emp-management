const express =  require('express')
// const companyRoute = require('./company.route')
const locationRoute = require('./location.route')
const regionRoute = require('./region.route')
const companyRoute = require('./company.route')


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
    }
]

masterRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router