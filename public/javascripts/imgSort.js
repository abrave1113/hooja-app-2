var express = require('express')
var app = require('../../server.js')
const path = require('path')
// const mongoose = require('mongoose')
// const Dewey = require('../../models/dewey.js')
// const { db } = require('../../models/dewey.js')
const deweyRankings = require('./deweyRankings.js')

function initProcess (res, dData) {
    try {
        this.roundOneFeed = deweyRankings(dData)
        // console.log(roundOneFeed[0].inGameLoss)
        let round = roundOneFeed
        let roundOne = round
        // console.log(roundOne[0].inGameLoss)
        // console.log(Array.isArray(roundOneFeed))

        // dData.sort((dew1, dew2) => dew1.winRate - dew2.winRate)

            const init = 0
            const second = 1
            const penult = Object.keys(roundOne).length - 2
            const last = Object.keys(roundOne).length - 1 

            const name1 = roundOne[init].name
            const name2 = roundOne[last].name
            const name3 = roundOne[second].name
            const name4 = roundOne[penult].name

            const pictureImagePath1 = roundOne[init].pictureImagePath
            const pictureImagePath2 = roundOne[last].pictureImagePath
            const pictureImagePath3 = roundOne[second].pictureImagePath
            const pictureImagePath4 = roundOne[penult].pictureImagePath

            const id1 = roundOne[init].id
            const id2 = roundOne[last].id
            const id3 = roundOne[second].id
            const id4 = roundOne[penult].id

            this.roundOneFeed[init].inGameLoss = 1
            this.roundOneFeed[last].inGameLoss = 1
            this.roundOneFeed[second].inGameLoss = 1
            this.roundOneFeed[penult].inGameLoss = 1


            // localStorage.getItem('first')

            // console.log(lesee)

            console.log(roundOneFeed[5].name)
            console.log('Here again')

            const useron = 3

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
        res.render('choose', { pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4, useron: useron } )
    } catch {
        console.log("Sorry, an error has occured")
    }
}

module.exports = initProcess