const express = require('express')
const controller = require('../controllers/rides')
const logger = require('../utils/logger')

const router = express.Router()

router.post('/rides', async (req, res) => {
    try {
        const result = await controller.addRides(req.body)

        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(503).send(error)
    }
})

router.get('/rides', async (req, res) => {
    try {
        const result = await controller.getRidesList(req.query)

        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(503).send(error)
    }
})

router.get('/rides/:id', async (req, res) => {
    try {
        const result = await controller.getRideById(req.params)

        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(503).send(error)
    }
})

module.exports = { router }
