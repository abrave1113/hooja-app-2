var express = require('express')
var app = express()
const path = require('path')
// const mongoose = require('mongoose')
// const Dewey = require('../../models/dewey.js')
// const { db } = require('../../models/dewey.js')
const initProcess = require('./imgSort.js')
const nextProcess = require('./nextProcess.js')


function lastImgSort (res, data) {
    // const roundOneFeed = initProcess.roundOneFeed
    // console.log(roundOneFeed[2].name)
    try {
        // console.log(roundOneFeed[0].inGameLoss)
        let lastOne = data
        let roundLast = lastOne
        // console.log(roundOne[0].inGameLoss)
        // console.log(Array.isArray(roundOneFeed))

        // dData.sort((dew1, dew2) => dew1.winRate - dew2.winRate)

            const init = 0
            const last = 1

            const name1 = roundLast[init].name
            const name2 = roundLast[last].name

            const pictureImagePath1 = roundLast[init].pictureImagePath
            const pictureImagePath2 = roundLast[last].pictureImagePath

            const id1 = roundLast[init].id
            const id2 = roundLast[last].id

            const first = roundOneFeed.findIndex(dwy => dwy.id == roundLast[init].id)
            roundOneFeed[first].inGameLoss = 1
            const ultimate = roundOneFeed.findIndex(dwy => dwy.id == roundLast[last].id)
            roundOneFeed[ultimate].inGameLoss = 1

            // localStorage.getItem('first')

            // console.log(lesee)

            // console.log(roundOneFeed[5].name)
            // console.log('Here again')

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
        res.render('lastChoose', {pictureImagePath1, pictureImagePath2, name1, name2, id1, id2, useron: useron } )
    } catch {
        console.log("Sorry, an error has occured on final choice")                    //"Sorry, an error has occured"
    }
}

module.exports = lastImgSort