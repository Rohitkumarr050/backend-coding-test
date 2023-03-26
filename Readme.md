# backend-coding-test
This is a basic project structure to help us to start building RESTful web APIs.

This project aims to represent an rides APIs to validate / test the use-case of expressjs framework and other tools.

# How to run this project
- Go to root directory and
- Run `npm install` Command
- Then Run `npm start` Command for start this project
- Run `npm test` command for test


## Tasks

1. [Documentation](#documentation)
2. [Implement Tooling](#implement-tooling)
3. [Implement Pagination](#implement-pagination)
4. [Refactoring](#refactoring)
5. [Security](#security)
6. [Load Testing](#load-testing)


### Documentation
# Project Structure
- index.js : Responsible for connecting the database and starting the server.
- app.js : Configure everything that has to do with Express application.
- app.js : The goal of the app is to Handle the request, take the request data, queries and send back the response to the client. 
- schemas -> It contain the schemas of the rides.

## Usage
The express server will be running at http://localhost:8010.

This app has 4 APIs:
1. Health check:
`POST /health`
```Response
healthy
```
2. Add rides: Responsible for adding a ride.
`POST /rides`
```Request json
{
    "start_lat": 29.893997,         // < -90 & > 90 and 
    "start_long": 33.455682,       // < -180 & > 180
    "end_lat": 26.486308,          // < -90 & > 90 and 
    "end_long": 35.038770,         // < -180 & > 180
    "rider_name":"testRider",
    "driver_name":"testDriver",
    "driver_vehicle":"Bike"
}
```
```Response json
[{
    "id" : 1
    "start_lat":29.893997,
    "start_long":33.455682,
    "end_lat":26.486308,
    "end_long":35.038770,
    "rider_name":"testRider",
    "driver_name":"testDriver",
    "driver_vehicle":"Bike"
}]
```
3. Get Ride By Id : 
`GET /rides/1`
```Response json
[{
    "id" : 1
    "start_lat":29.893997,
    "start_long":33.455682,
    "end_lat":26.486308,
    "end_long":35.038770,
    "rider_name":"testRider",
    "driver_name":"testDriver",
    "driver_vehicle":"Bike"
}]
```

4. Get All Rides : 
`GET /rides`
```Response json
[{
    "id" : 1
    "start_lat":29.893997,
    "start_long":33.455682,
    "end_lat":26.486308,
    "end_long":35.038770,
    "rider_name":"testRider",
    "driver_name":"testDriver",
    "driver_vehicle":"Bike"
},
{
    "id" : 2
    "start_lat":30.893997,
    "start_long":37.455682,
    "end_lat":28.486308,
    "end_long":35.038770,
    "rider_name":"testRider2",
    "driver_name":"testDriver2",
    "driver_vehicle":"Bike"
}
]
```
