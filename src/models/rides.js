const db = require('../config/db')
const logger = require('../utils/logger')

function addRide(input) {
    return new Promise((resolve, reject) => {
        const values = [input.start_lat, input.start_long, input.end_lat, input.end_long, input.rider_name, input.driver_name, input.driver_vehicle]

        db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                logger.error('error add ride insert query', err)
                reject(err)
                return
            }

            resolve(this.lastID)
        })
    })
}

function getRideById(rideId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Rides WHERE rideID = ?', rideId, (err, rows) => {
            if (err) {
                logger.error('error get ride by Id query', err)
                reject(err)
                return
            }

            if (rows && rows.length > 0) {
                resolve(rows[0])
            } else {
                resolve(null)
            }
        })
    })
}

function getAllRides(page, limit) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit
        db.all(`SELECT * FROM Rides LIMIT ${limit} OFFSET ${offset}`, (err, rows) => {
            if (err) {
                logger.error('error get all Ride query', err)
                reject(err)
                return
            }
            resolve(rows)
        })
    })
}

module.exports = {
    addRide,
    getRideById,
    getAllRides,
}
