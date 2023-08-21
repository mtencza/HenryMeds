/*
API Schema:

Allow providers to submit times they'd like to work on the schedule:
Endpoint: /reservations/schedule
HTTP: POST
Body:
providerid
start_time
end_time

Allow clients to reserve an available slot
Endpoint: /reservations
HTTP: POST
Body:
providerid
clientid
start_time
end_time

Allow clients to confirm their reservation
Endpoint: /reservations/confirmation
HTTP: POST
Body:
reservationid
*/



/*
DB Schema:

*************
Clients
*************
clientid: int pk

*************
Providers
*************
providerid: int pk

*************
Schedules
*************
scheduleid: int pk
providerid: int fk
start_time: timestamp
end_time:   timestamp
date:       date (YYYY-MM-DD)

*************
Reservations
*************
reservationid: int pk
providerid:    int fk
clientid:      int fk
booked:        bool
confirmed:     bool
start_time:    timestamp
end_time:      timestamp
creation_time: timestamp
*/

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const app = express();
app.use(bodyParser.json());