var express = require('express')
var app = express()
const path = require('path')
const initProcess = require('./imgSort.js')
const nextProcess = require('./nextProcess.js')


function lastImgSort (res, data) {
    try {
        let lastOne = data
        let roundLast = lastOne

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
            const ultimate = roundOneFeed.findIndex(dew => dew.id == roundLast[last].id)
            roundOneFeed[ultimate].inGameLoss = 1

        const useron = 3
        res.render('lastChoose', {pictureImagePath1, pictureImagePath2, name1, name2, id1, id2, useron: useron } )
    } catch {
        console.log("Sorry, an error has occured on final choice")                    //"Sorry, an error has occured"
    }
}

module.exports = lastImgSort