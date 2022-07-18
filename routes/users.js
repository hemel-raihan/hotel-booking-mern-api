const express = require('express');
const { updateUser, deleteUser, userDetails, allUsers } = require('../controllers/user');
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken');

const router = express.Router();

// router.get('/check', verifyToken, (req, res, next)=>{
//     res.json('hellooo baby');
// })

// router.get('/check/:id', verifyUser, (req, res, next)=>{
//     res.json('hellooo delete');
// })

// router.get('/checked', verifyAdmin, (req, res, next)=>{
//     res.json('hellooo admin');
// })

//UPDATE
router.post('/:id', verifyUser, updateUser)

//Delete
router.delete('/:id', verifyUser, deleteUser)

//Hotel Details
router.get('/:id', verifyUser.apply, userDetails)

//All Hotels
router.get('/', verifyAdmin, allUsers)

module.exports = router