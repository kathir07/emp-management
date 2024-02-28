const express =  require('express')
const locationRoute = require('./location.route')
const regionRoute = require('./region.route')
const companyRoute = require('./company.route')
const departmentRoute = require('./department.route')
const userTypeRoute = require('./userType.route')
const leavePolicyRoute = require('./leavePolicy.route')
const shiftTimeRoute = require('./shiftTime.route')
const leavePolicyDetailRoute = require('./leavePolicyDetail.route')
const holidayPolicyRoute = require('./holidayPolicy.route')



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
    },
    {
        'path': '/user-type',
        'route': userTypeRoute
    },
    {
        'path': '/leave-policy',
        'route': leavePolicyRoute
    },
    {
        'path': '/shift-time',
        'route': shiftTimeRoute
    },
    {
        'path': '/leave-policy-detail',
        'route': leavePolicyDetailRoute
    },
    {
        'path': '/holiday-policy',
        'route': holidayPolicyRoute
    }
]

masterRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router