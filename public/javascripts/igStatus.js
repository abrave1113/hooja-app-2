const express = require('express')
var app = express()
const path = require('path')
const initProcess = require('./imgSort.js')

function status (req, res, next) {
    const currentRoundSlate = roundOneFeed.filter(dwey => dwey.inGameLoss === 0)
    currentRoundSlateCount = currentRoundSlate.length + 2
    // const inGame = req.app.locals.inGame
    // console.log(inGame)
    if (currentRoundSlateCount > 0) {
            console.log('status:'+' '+currentRoundSlateCount+' remain in queue')                                   //'A selection error has occurred'
            // res.end
            // res.end
    } else {
        req.app.locals.inGame = false
        console.log('Last round!')
        console.log('CRSC: '+ currentRoundSlateCount)
}
    next()        
}
    
module.exports = status