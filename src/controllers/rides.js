const rideModel = require('../models/rides')
const logger = require('../utils/logger')

function latLongValidation(latitude, longitude) {
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return false
    }
    return true
}
async function addRides(input) {
    try {
        const startLatitude = Number(input.start_lat)
        const startLongitude = Number(input.start_long)
        const endLatitude = Number(input.end_lat)
        const endLongitude = Number(input.end_long)
        const riderName = input.rider_name
        const driverName = input.driver_name
        const driverVehicle = input.driver_vehicle

        const startLatLong = latLongValidation(startLatitude, startLongitude)
        const endLatLong = latLongValidation(endLatitude, endLongitude)
        if (!startLatLong || !endLatLong) {
            return {
                error_code: 'VALIDATION_ERROR',
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
            }
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return {
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            }
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return {
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            }
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return {
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string',
            }
        }
        let result = {}
        const rideId = await rideModel.addRide(input)
        if (rideId) {
            result = await rideModel.getRideById(rideId)
        }

        return result
    } catch (error) {
        logger.error(error)
        throw error
    }
}

async function getRideById(input) {
    try {
        const ride = await rideModel.getRideById(input.id)
        if (!ride) {
            return {
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides',
            }
        }
        return ride
    } catch (error) {
        logger.error(error)
        throw error
    }
}

async function getRidesList(input) {
    try {
        const page = input.page ? parseInt(input.page, 10) : 0
        const limit = input.limit ? parseInt(input.limit, 10) : 50

        const ridesList = await rideModel.getAllRides(page, limit)
        if (ridesList && ridesList.length > 0) {
            return ridesList
        }

        return {
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
        }
    } catch (error) {
        logger.error(error)
        throw error
    }
}

module.exports = {
    addRides,
    getRideById,
    getRidesList,
}
