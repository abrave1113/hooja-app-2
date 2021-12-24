const express = require('express')
const app = express()
const path = require('path')
// const isItLastRound = require('./isItLastRound.js')
// const initProcess = require('./imgSort.js')
const nextImgSort = require('./nextImgSort.js')
const nextProcess  = require ('./nextProcess.js')
const lastImgSort  = require ('./lastImgSort.js')

function initialize (req, res, next) {
            // ticky = 0
            if (req.headers.referer.indexOf("choose") < 1) {
                indicator = 0
                this.uptick = 0
            }
            else {
                indicator = 1
            } 
            // ticky += indicator
        
        this.uptick = indicator
        next()
        // this.ticky += indicator
        // console.log('ticky: '+ticky)
        // console.log('inGame status: '+req.app.locals.inGame)
        // next()
}
// function initialize(req, res, next) {
//     req.app.locals.initial = 0
//     if (app.locals.settings.inGame = false) {
//     req.app.locals.initial = 0
// } else {req.app.locals.initial += 1}
//   next()
// }

module.exports = initialize