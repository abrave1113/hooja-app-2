const express = require('express')
const app = express()
const path = require('path')
const initialize = require ('./initialize.js')
// const isItLastRound = require('./isItLastRound.js')
// const initProcess = require('./imgSort.js')
const nextImgSort = require('./nextImgSort.js')
const nextProcess  = require ('./nextProcess.js')
const lastImgSort  = require ('./lastImgSort.js')

function chooseOrNotInitial(req, res, next) {
        if(uptick < 1 || req.headers.referer.indexOf("lasttwodew") >= 0) {
            console.log('initial pass')
            console.log('Uptick: '+uptick)            
            // console.log('choose/In-game: '+req.app.locals.inGame)
            console.log('Uptick: '+uptick)
        } else if (nextRoundFeed.length>2) {
            nextImgSort(res, nextRoundFeed)
            console.log('Uptick: '+uptick)
            console.log('nextRoundFeed: ' + nextRoundFeed.length)
            return
        } else {
            uptick=null
            res.redirect('/deweys/submittal/lasttwodew')
            return
        }
        next()
}
    
module.exports = chooseOrNotInitial