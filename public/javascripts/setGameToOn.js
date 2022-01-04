var express = require('express')
var app = express()
const path = require('path')

function setGameToOn (req, res, next) {
  if(!typeof(nextRoundFeed) == "undefined" ) {
    next()
  }
    try {
      req.app.locals.inGame = true
      console.log("igs: " + req.app.locals.inGame)
      next()
  } catch {
      console.log("Cannot set game to on")
      res.end
  }
}

module.exports = setGameToOn