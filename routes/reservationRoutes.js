const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.post('/reservations/confirmation', async (req, res) => {
    const reservationid = req.body;

    if (!reservationid) {
        res.status(400).json({ error: 'Missing reservationid' });
        return;
    }

    try {
        const reservation = await reservationController.confirm(reservationid);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/reservations', async (req, res) => {
    const providerid = req.body.providerid;
    const clientid = req.body.clientid;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    const errorStr = 'Missing fields: ';

    if(!providerid) {
        errorStr += 'providerid'
    }

    if(!clientid) {
        errorStr += ', clientid '
    }

    if(!start_time) {
        errorStr += ', start_time'
    }

    if(!end_time) {
        errorStr += ', end_time'
    }

    if(errorStr !== 'Missing fields: ') {
        res.status(400).json({ error: errorStr});
        return;
    }
  
    try {
      const reservation = await reservationController.reserve(providerid, clientid, start_time, end_time);
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;