const express = require('express');
const { createRoom, updateRoom, deleteRoom, roomDetails, allRooms, updateRoomAvailability } = require('../controllers/room');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post('/:hotelId', verifyAdmin, createRoom)

//UPDATE
router.post('/:id', verifyAdmin, updateRoom)

router.put('/availability/:id', updateRoomAvailability)

//Delete
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)

//Hotel Details
router.get('/:id', roomDetails)

//All Hotels
router.get('/', allRooms)

module.exports = router