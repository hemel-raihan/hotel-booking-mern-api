const express = require('express');
const {createHotel, updateHotel, deleteHotel, hotelDetails, allHotels} = require('../controllers/hotels');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel)

//UPDATE
router.post('/:id', verifyAdmin, updateHotel)

//Delete
router.delete('/:id', verifyAdmin, deleteHotel)

//Hotel Details
router.get('/:id', hotelDetails)

//All Hotels
router.get('/', allHotels)

module.exports = router