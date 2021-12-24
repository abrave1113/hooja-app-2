var express = require('express')
var app = express()
const path = require('path')
const initProcess  = require ('./imgSort.js')
// const nextProcess  = require ('./nextProcess.js')

function subMain (req, res, next) {
    console.log(req.app.locals.inGame)
    let reroute
    if (req.app.locals.inGame===false) {
            reroute = 'true'
    } else {
            reroute = 'false'
    }
    //receive selected object id's - set inGame to true    
    try {
        const first = req.body.first
        console.log(first)
        console.log(req.app.locals.inGame)   
        const second = req.body.second
        // app.set('inGame', res.locals.inGame)
    
        const setWinIndex1 = roundOneFeed.findIndex(dwey => dwey.id == first)
        const setWinIndex2 = roundOneFeed.findIndex(dwey => dwey.id == second)
        console.log('setWinIndex1')
        console.log(setWinIndex2)
        //Find and adjust in-game stats to reflect current submitted selections
        roundOneFeed[setWinIndex1].inGameLoss = 0
        roundOneFeed[setWinIndex1].inGameWin += 1
        roundOneFeed[setWinIndex2].inGameLoss = 0
        roundOneFeed[setWinIndex2].inGameWin += 1
        // res.render('choose', { roundOneFeed, pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4  })
        console.log(roundOneFeed[6].name)
        console.log(roundOneFeed[1].inGameLoss)
        console.log(req.app.locals.settings)
        //Bring in res object from nextProcess.js
        console.log('reroute: '+ reroute)
        if (reroute==='true') {
            res.redirect('/deweys/submittal/nexttwodews')
        }
    } catch {
        console.log('There was a selection update error.')
        return
    }
    next()
}

module.exports = subMain