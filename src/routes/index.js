const express = require('express')
const rideRoute = require('./rides')
const healthRoute = require('./healthCheck')

const apiRoutes = express.Router()

apiRoutes.use(rideRoute.router)
apiRoutes.use(healthRoute.router)

function startRoutes(app) {
    app.use('/', apiRoutes)
}

module.exports = { startRoutes }
