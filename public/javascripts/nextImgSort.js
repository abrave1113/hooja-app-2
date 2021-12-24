var express = require('express')
var app = express()
const path = require('path')
// const mongoose = require('mongoose')
// const Dewey = require('../../models/dewey.js')
// const { db } = require('../../models/dewey.js')
const initProcess = require('./imgSort.js')

function nextImgSort (res, data) {
    // const roundOneFeed = initProcess.roundOneFeed
    // console.log(roundOneFeed[2].name)
    try {
        // console.log(roundOneFeed[0].inGameLoss)
        let round = data
        let roundNext = round
        // console.log(roundOne[0].inGameLoss)
        // console.log(Array.isArray(roundOneFeed))

        // dData.sort((dew1, dew2) => dew1.winRate - dew2.winRate)

            const init = 0
            const second = 1
            const penult = Object.keys(roundNext).length - 2
            const last = Object.keys(roundNext).length - 1 

            const name1 = roundNext[init].name
            const name2 = roundNext[last].name
            const name3 = roundNext[second].name
            const name4 = roundNext[penult].name

            const pictureImagePath1 = roundNext[init].pictureImagePath
            const pictureImagePath2 = roundNext[last].pictureImagePath
            const pictureImagePath3 = roundNext[second].pictureImagePath
            const pictureImagePath4 = roundNext[penult].pictureImagePath

            const id1 = roundNext[init].id
            const id2 = roundNext[last].id
            const id3 = roundNext[second].id
            const id4 = roundNext[penult].id

            // const first = roundOneFeed.findIndex(dwy => dwy.id == roundNext[init].id)
            // roundOneFeed[first].inGameLoss = 1
            // const ultimate = roundOneFeed.findIndex(dwy => dwy.id == roundNext[last].id)
            // roundOneFeed[ultimate].inGameLoss = 1
            // const nextOne = roundOneFeed.findIndex(dwy => dwy.id == roundNext[second].id)
            // roundOneFeed[nextOne].inGameLoss = 1
            // const nextToLast = roundOneFeed.findIndex(dwy => dwy.id == roundNext[penult].id)
            // roundOneFeed[nextToLast].inGameLoss = 1


            // localStorage.getItem('first')

            // console.log(lesee)

            console.log(roundOneFeed[5].name)
            console.log('Here again')

            // const dewey1 =  await Dewey.find({ "name": name1 })
            // dewey1.pictureImagePath =  await Dewey.find({ "name": name1 } ).pictureImagePath

            // const dewey2 =  await Dewey.find({ "name": "Rachel" } )
            // // dewey2.pictureImagePath =  await Dewey.find({ name: name2 } ).pictureImagePath
            // console.log(dewey2.age != null)

            // const dewey3 =  await Dewey.find({ "name": name3 } )
            // dewey3.pictureImagePath =  await Dewey.find({ "name": name3 } ).pictureImagePath

            // const dewey4 =  await Dewey.find({ "name": name4 } )
            // dewey4.pictureImagePath =  await Dewey.find({ "name": name4 } ).pictureImagePath
        

        // return { dewey1, dewey2, dewey3, dewey4}
        // res.redirect(request.get('referer'));
        const useron = 3
        res.render('choose', {pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4, useron: useron } )
    } catch {                                                         //(error)
        console.log("Sorry, an error has occured")                    //"Sorry, an error has occured"
    }
}

module.exports = nextImgSort