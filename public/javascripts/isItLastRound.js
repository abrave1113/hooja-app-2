var express = require('express')
var app = express()
const path = require('path')
const router = express.Router()
const nextProcess = require('./nextProcess.js')

function isItLastRound(req, res, next) {
    if(nextRoundFeed.length < 3) {
        // if(req.app.locals.inGame===false) {      
        function myRoute(req, res, next) {
              return res.send('ok')
        }
            function home(req, res, next) {
               req.url = '/submittal/chooseFinal'
            
               // below is the code to handle the "forward".
               // if we want to change the method: req.method = 'POST'        
               return router._router.handle(req, res, next)
        }
            
                router.get('/submittal/chooseFinal', myRoute)
                router.get('/', home)
    } 
    else next()
}


// module.exports = isItLastRound