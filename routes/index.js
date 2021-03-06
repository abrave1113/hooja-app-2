const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const Dewey = require('../models/dewey')
const path = require('path')

router.get('/', (req, res) => {
    try {
        res.redirect('/deweys')
    } catch (error) {
        console.log(error)
        res.send('Sorry, connection error')
    }
})

module.exports = router