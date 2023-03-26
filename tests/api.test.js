'use strict'

const request = require('supertest')
const assert = require('assert')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

const app = require('../src/app')(db)
const buildSchemas = require('../src/schemas')

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err)
            }

            buildSchemas(db)

            done()
        })
    })

    after((done) => {
        db.close((err) => {
            if (err) {
                return done(err)
            }

            return done()
        })
    })

    describe('GET /health', () => {
        it('should return health', async () => {
            await request(app).get('/health').expect('Content-Type', /text/).expect(200)
        })
    })

    describe('POST /rides add Rides', () => {
        it('it should validate start_lat and start_long ', async () => {
            let ride = {
                start_lat: -99.893997,
                start_long: -133.455682,
                end_lat: 26.486308,
                end_long: 35.03877,
                rider_name: 'testing',
                driver_name: 'test user',
                driver_vehicle: 'bike',
            }

            let res = await request(app).post('/rides').send(ride).expect('Content-Type', 'application/json; charset=utf-8')

            assert.equal(res.body.error_code, 'VALIDATION_ERROR', 'Expected start_lat and start_long validation error!')
        })

        it('it should validate driver_name', async () => {
            let ride = {
                start_lat: 29.893997,
                start_long: 33.455682,
                end_lat: -96.486308,
                end_long: -105.03877,
                rider_name: 'testing',
                driver_name: '',
                driver_vehicle: 'bike',
            }

            let res = await request(app).post('/rides').send(ride).expect('Content-Type', 'application/json; charset=utf-8')

            assert.equal(res.body.error_code, 'VALIDATION_ERROR', 'Expected driver_name validation error!')
        })

        it('it should validate rider_name', async () => {
            let ride = {
                start_lat: 29.893997,
                start_long: 33.455682,
                end_lat: -26.486308,
                end_long: -35.03877,
                rider_name: '',
                driver_name: 'test user',
                driver_vehicle: 'bike',
            }

            let res = await request(app).post('/rides').send(ride).expect('Content-Type', 'application/json; charset=utf-8')

            assert.equal(res.body.error_code, 'VALIDATION_ERROR', 'Expected rider_name validation error!')
        })

        it('it should validate driver_vehicle', async () => {
            let ride = {
                start_lat: 29.893997,
                start_long: 33.455682,
                end_lat: 26.486308,
                end_long: 35.03877,
                rider_name: 'testing',
                driver_name: 'test user',
                driver_vehicle: '',
            }

            let res = await request(app).post('/rides').send(ride).expect('Content-Type', 'application/json; charset=utf-8')

            assert.equal(res.body.error_code, 'VALIDATION_ERROR', 'Expected driver_vehicle validation error!')
        })

        it('it should add rides', async () => {
            let ride = {
                start_lat: 29.893997,
                start_long: 33.455682,
                end_lat: 26.486308,
                end_long: 35.03877,
                rider_name: 'testing',
                driver_name: 'test user',
                driver_vehicle: 'bike',
            }

            let res = await request(app).post('/rides').send(ride).expect('Content-Type', 'application/json; charset=utf-8')
            assert.equal(res.body.length, 1, 'Expected Rides array')
            //   assert.deepStrictEqual(res.body, [ride]);
        })
    })

    describe('GET /rides with pagination', () => {

        it('it should validate pagination', async () => {
            let res = await request(app).get('/rides')
                .query({ page: 1})
                .expect('Content-Type', 'application/json; charset=utf-8')

            if (res.body.hasOwnProperty('error_code')) {
                assert.equal(res.body.error_code, 'RIDES_NOT_FOUND_ERROR', 'Expected Ride not found Error')
            }
        })

        it('it should return the rides', async () => {
            let res = await request(app).get('/rides')
                .query({ page: 1, limit: 10 })
                .expect('Content-Type', 'application/json; charset=utf-8')

            if (res.body.hasOwnProperty('error_code')) {
                assert.equal(res.body.error_code, 'RIDES_NOT_FOUND_ERROR', 'Expected Ride not found Error')
            }
        })
    })

    describe('GET /rides/:id', () => {
        it('it should invalid rideId', async () => {
            let rideId = '-98'

            let res = await request(app)
                .get('/rides/' + rideId)
                .expect('Content-Type', 'application/json; charset=utf-8')
            assert.equal(res.body.error_code, 'RIDES_NOT_FOUND_ERROR', 'Expected Ride not found Error')
        })

        it('it should return the ride by rideId', async () => {
            let rideId = 1

            let res = await request(app)
                .get('/rides/' + rideId)
                .expect('Content-Type', 'application/json; charset=utf-8')
            assert.equal(res.body.length, 1, 'Expected Rides array')
        })
    })
})
