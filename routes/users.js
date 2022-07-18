const express = require('express');
const { updateUser, deleteUser, userDetails, allUsers } = require('../controllers/user');
const {verifyToken} = require('../utils/verifyToken');

const router = express.Router();

router.get('/check', verifyToken, (req, res, next)=>{
    res.json('hellooo baby');
})

router.get('/check/:id', verifyToken, (req, res, next)=>{
    res.json('hellooo baby');
})

//UPDATE
router.post('/:id', updateUser)

//Delete
router.delete('/:id', deleteUser)

//Hotel Details
router.get('/:id', userDetails)

//All Hotels
router.get('/', allUsers)

module.exports = router