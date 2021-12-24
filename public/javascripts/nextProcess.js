var express = require('express')
var app = express()
const path = require('path')
const deweyRankings = require('./deweyRankings.js')
const initProcess = require('./imgSort.js')
const dbUpdate = require('./dbUpdate.js')
const eliminatedDews = []
let doneDews

async function nextProcess (req, res, next) {
    if(req.app.locals.inGame===false) {
        eliminatedDews.push(...doneDews)
        await dbUpdate(eliminatedDews)
        eliminatedDews.length = 0
    }
    // if(typeof nextRoundFeed === undefined) {
    //     let nextRoundFeed = []
    // }
    try {
        // const doneDews = req.app.locals.doneDews
        
        // console.log(doneDews.map(dew => dew.name)
        // req.app.locals.doneDews = roundOneFeed.filter(dwy => dwy.inGameLoss !== 0 && nextRoundFeed.contains(dwy))
        // eliminatedDews.push(doneDews[1])
        // console.log(eliminatedDews.map(nextD => `${nextD.name}: ${nextD.inGameWin}` ))
        this.nextRoundFeed = roundOneFeed.filter(init => init.inGameLoss === 0)
        // console.log(nextRoundFeed[6].inGameWin)

        doneDews = roundOneFeed.filter(dd => dd.inGameLoss !== 0)
        
        // const doneDews = req.app.locals.doneDews
        // eliminatedDews.push(...doneDews)

        console.log(doneDews.map(dd => dd.name+": "+dd.inGameWin))
        console.log(roundOneFeed.map(rounder => rounder.name+": "+rounder.inGameWin+" - "+rounder.inGameLoss))

        console.log(app.locals.settings.inGame)
        let next = nextRoundFeed
        let nextRound = next
        // console.log(roundOne[0].inGameLoss) 
        // console.log(Array.isArray(roundOneFeed))

        // const doubleDoneDews = doneDews.filter(dd => !this.nextRoundFeed.contains(dd))
        

        // dData.sort((dew1, dew2) => dew1.winRate - dew2.winRate)

            const init = 0
            const second = 1
            const penult = Object.keys(nextRound).length - 2
            const last = Object.keys(nextRound).length - 1 

            res.locals.name1 = nextRound[init].name
            res.locals.name2 = nextRound[last].name
            res.locals.name3 = nextRound[second].name
            res.locals.name4 = nextRound[penult].name

            res.locals.pictureImagePath1 = nextRound[init].pictureImagePath
            res.locals.pictureImagePath2 = nextRound[last].pictureImagePath
            res.locals.pictureImagePath3 = nextRound[second].pictureImagePath
            res.locals.pictureImagePath4 = nextRound[penult].pictureImagePath

            res.locals.id1 = nextRound[init].id
            res.locals.id2 = nextRound[last].id
            res.locals.id3 = nextRound[second].id
            res.locals.id4 = nextRound[penult].id

            // const name1 = res.locals.name1
            // const name2 = res.locals.name2
            // const name3 = res.locals.name3
            // const name4 = res.locals.name4

            // const pictureImagePath1 = res.locals.pictureImagePath1
            // const pictureImagePath2 = res.locals.pictureImagePath2
            // const pictureImagePath3 = res.locals.pictureImagePath3
            // const pictureImagePath4 = res.locals.pictureImagePath4

            // const id1 = res.locals.id1
            // const id2 = res.locals.id2
            // const id3 = res.locals.id3
            // const id4 = res.locals.id4

            //Assign losses to four current potential selectees
            const first = await roundOneFeed.findIndex(dwy => dwy.id == nextRoundFeed[init].id)
            roundOneFeed[first].inGameLoss = 1
            const ultimate = await roundOneFeed.findIndex(dwy => dwy.id == nextRoundFeed[last].id)
            roundOneFeed[ultimate].inGameLoss = 1
            const nextOne = await roundOneFeed.findIndex(dwy => dwy.id == nextRoundFeed[second].id)
            roundOneFeed[nextOne].inGameLoss = 1
            const nextToLast = await roundOneFeed.findIndex(dwy => dwy.id == nextRoundFeed[penult].id)
            roundOneFeed[nextToLast].inGameLoss = 1
            
        console.log(nextRound[last].name)
        console.log(res.locals.id1)
        // return { dewey1, dewey2, dewey3, dewey4}
        // var redirect = res.end;
        // res.end = function (pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4) {
        // res.end = redirect;
        // res.redirect('choose', { pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4 );



        console.log('got this far')
        // return res.render('choose', { pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4  })
    } catch {
        console.log('Here it is again for you')
        res.end
    }
    next()
}

module.exports = nextProcess