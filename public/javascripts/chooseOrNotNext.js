// const express = require('express')
// const app = express()
// const path = require('path')

function chooseOrNotNext(req, res, next) {
        if(req.app.locals.inGame !== true) {
            console.log('did work')
        } else {
            console.log("did not work")
            return 
        }
        next()
    }
    
// module.exports = chooseOrNotNext