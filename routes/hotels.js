const express = require('express');
const {createHotel, updateHotel, deleteHotel, hotelDetails, allHotels} = require('../controllers/hotels')

const router = express.Router();

//CREATE
router.post('/', createHotel)

//UPDATE
router.post('/:id', updateHotel)

//Delete
router.delete('/:id', deleteHotel)

//Hotel Details
router.get('/:id', hotelDetails)

//All Hotels
router.get('/', allHotels)

module.exports = router