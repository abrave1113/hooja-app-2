const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const secret = process.env.ACCESS_TOKEN_SECRET

require('dotenv').config()

function authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403)
            req.app.locals.user = user
            console.log(user)
            next()
        })
    } 

module.exports = authenticateToken