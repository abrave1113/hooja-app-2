const path = require('path')
var express = require('express')
var app = express()
// const {rofProxy} = require('./imgSort.js')

const deweyRankings = function(data) {

const roundOne = data
// let userId = 'a12b3c'
console.log(roundOne[2].name)
// console.log(req.app.locals.inGame)

// if (first) {
// 	console.log('first exists')
// }

const first = roundOne.map(function(dewObject) {
	// dewObject.randomFactor = Math.random()*100000
	return	{
			id: dewObject.id,
			pictureImagePath: dewObject.pictureImagePath, 
			name: dewObject.name,
			winRate: dewObject.winRate,
			// rank: dewObject.rank, 
			inGameLoss: 0,
			inGameWin: 0
			// function () {
			// 	if(!rofProxy) {
			// 	return 0
			// 	} else {
			// 	return rofProxy.find(proxy => proxy.id===dewObject.id).inGameWin
			// 	}
			// // random: dewObject.randomFactor
			// }
		}
	}).sort((a, b) => (b.winRate - a.winRate) )
		// console.log(Array.isArray(first))
		return first
}



// console.log(roundOne[0])

module.exports = deweyRankings
