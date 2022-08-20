const express = require('express');
const {createHotel, updateHotel, deleteHotel, hotelDetails, allHotels, allHotelsByCity, allHotelsByType, getHotelRooms} = require('../controllers/hotels');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel)

//UPDATE
router.post('/:id', verifyAdmin, updateHotel)

//Delete
router.delete('/:id', verifyAdmin, deleteHotel)

//Hotel Details
router.get('/find/:id', hotelDetails)

//All Hotels
router.get('/', allHotels)

router.get('/countByCity', allHotelsByCity)

router.get('/countByType', allHotelsByType)

router.get('/room/:id', getHotelRooms)

module.exports = router