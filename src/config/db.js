const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(':memory:')
const buildSchemas = require('../models/schema/rideSchema')

db.serialize(() => {
    buildSchemas(db)
})

module.exports = db
