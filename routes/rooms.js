const express = require('express')

const router = express.Router();

router.get('/', (req, res)=>{
    res.json('hello auth')
})

module.exports = router