const express =  require('express')
const roleRoute = require('./role.route')

const router = express.Router();

const adminRoutes = [
    {
        'path': '/role',
        'route': roleRoute
    },
   
]

adminRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router