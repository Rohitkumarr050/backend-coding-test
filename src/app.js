const express = require('express')
const cors = require('cors')
const { startRoutes } = require('./routes')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(500).send('Server is Running...')
})

startRoutes(app)

module.exports = app
