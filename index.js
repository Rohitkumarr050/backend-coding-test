// const express = require('express')
const logger = require('./src/utils/logger'); 

// const app = express()
const port = 8010

// const bodyParser = require('body-parser')

// const jsonParser = bodyParser.json()

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(':memory:')

const buildSchemas = require('./src/schemas')
const routes = require('./src/app')

db.serialize(() => {
    buildSchemas(db)
    const app = routes(db)

    app.listen(port, () => logger.info(`App started and listening on port ${port}`))
})
