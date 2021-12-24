const path = require('path')
const express = require('express')
// const { Agent } = require('https')
const router = express.Router()
const mongoose = require('mongoose')
const Dewey = require('../models/dewey')
const Rank = require('../models/rank')
const bodyParser = require('body-parser');
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const events = require('events')
const toId = mongoose.Types.ObjectId
// const { find } = require('../models/dewey')
// mongoose.connect('mongodb://localhost/hooja', {useNewUrlParser: true, useUnifiedTopology: true});
// Initialize rank/re-rank
router.get('/ranks', async (req, res) => {
    // const deweys = await Dewey.find({})
    // // var myEmitter = new events.EventEmitter();
    // // myEmitter.on('loadO', () => {
    // //   res.redirect('/bbox')
    // // })
    try {    
        initProcess(deweys)
        } catch {
            res.redirect('/deweys')
        }

        // myEmmitter('loadO')
})
    
// blue box render setup
router.get('/bbox', async (req, res) => {
    const deweys = await Dewey.find({})
    // myEmitter.on('loadB', () => {
    //     res.redirect('/gbox')
    // })    

    const init = 0
    const second = 1
    const penult = Object.keys(deweys).length - 2
    const last = Object.keys(deweys).length - 1 

    try {
        const idArray = Object.entries('deweys').map(dewey => dewey.id)

        const dewey = await Dewey.findById(idArray[last].id)        
        res.render(choose, dewey )        
      } catch {
        res.send( 'Error finding data...')        
    }

    // next(myEmmitter('loadB'));    
})

// green box render setup
router.get('/gbox', async (req, res) => {
    const deweys = await Dewey.find({})
    // myEmitter.on('loadG', () => {
    //     res.redirect('/ybox')
    // })        

    const init = 0
    const second = 1
    const penult = Object.keys(deweys).length - 2
    const last = Object.keys(deweys).length - 1 

    try {
        const dewey = await Dewey.findById(idArray[second].id)        
        res.render(choose, dewey )        
    } catch {
        res.send( 'Error finding data...')        
    }

    // next(myEmitter('loadG'))    
})

// blue box render setup
router.get('/ybox', async (req, res) => {
    const deweys = await Dewey.find({})
    // myEmitter.on('loadY', () => {
    //     console.log('Surprising success thus far  ')
    // })            

    const init = 0
    const second = 1
    const penult = Object.keys(deweys).length - 2
    const last = Object.keys(deweys).length - 1 

    try {
        const dewey = await Dewey.findById(idArray[penult].id)        
        res.render(choose, dewey )        
    } catch {
        res.send( 'Error finding data...')        
    }
})

// One-time initial upload into ranks collection
router.get('*/seed*', async (req, res) => {
    
    ranks = [
        { rankName: "Dina", win: 0, loss: 0 },
        { rankName: "Rachel", win: 0, loss: 0 },
        { rankName: "grace", win: 0, loss: 0 },
        { rankName: "jasmin", win: 0, loss: 0 },
        { rankName: "Genevieve", win: 0, loss: 0 },
        { rankName: "Lucy", win: 0, loss: 0 },
        { rankName: "beni", win: 0, loss: 0 },
        { rankName: "Bianca", win: 0, loss: 0 },
        { rankName: "dani", win: 0, loss: 0 },
        { rankName: "Grace", win: 0, loss: 0 },
        { rankName: "Danielle", win: 0, loss: 0 },
        { rankName: "lilly", win: 0, loss: 0 },
        { rankName: "maria", win: 0, loss: 0 },
        { rankName: "karin", win: 0, loss: 0 },
        { rankName: "Vicky", win: 0, loss: 0 },
        { rankName: "nila", win: 0, loss: 0 },
    ]

    const newRanks = await Rank.create(ranks)
    res.json(newRanks)
})

// Create association between dewey and rank object
router.get('/relate/:dewey/:rank', async (req, res) => {

    const dewey = toId(req.params.dewey)
    const rank = await Rank.findById(req.params.rank)
    // console.log(rank)    
    rank.dewey = dewey
    // console.log(rank)    
    rank.save(function (err) {
        if (err) throw err;

        // console.log("Association created")
    })
    // console.log(rank.dewey)    
    res.json(rank)
})

router.get('/addWinRate', async (req, res) => {
    try {
        const results = []
        const deweys = await Dewey.find({})        
        const dData = Array.from(deweys)
        dData.forEach(async function (dewey) {
            await Dewey.updateOne({name:dewey.name}, [{
                $set: {
                    winRate: {
                        $divide: [
                            dewey.win, {
                                $add: 
                                    [dewey.win, dewey.loss]
                                }
                            ]
                        }
                    }
                }])
                const printResult = {
                    name: dewey.name, 
                    winRate: dewey.winRate, 
                    win: dewey.win, 
                    loss: dewey.loss
                }
                console.log(JSON.stringify(printResult))
                results.push(printResult)
            })
            // await dewey.save()
            // const printResult = deweys.forEach(async function (dewey) {
            //     await Dewey.findOne({name: dewey.name}, {name: 1, winRate: 1}, {new: true}, async (err, dd) => {
            //     if (err) {
            //         throw(err)
            //     }
            // else {
                // dd = await Dewey.findOneAndUpdate(query, data, function(err, doc) {
                //     if (err) return console.log("error: "+err);
        //             return console.log(dd.name+": "+dd.winRate);
        //         } 
        //     })
        //     console.log(printResult)
        //     res.json(printResult)
        // })
        res.json(results)
        
    }    
    catch(err) {
        console.log(err) 
    }
})

router.get('/addRandom', async (req, res) => {
    try {
        const deweys = await Dewey.find({})
        const dData = Array.from(deweys)
        dData.forEach(async function (dewey) {
            await Dewey.updateOne({name: dewey.name}, [{
                $addFields: {
                    random: Math.floor(Math.random() * 100000 )
                    }
                }])
            })
            // await dewey.save()
            // const printResults = await Dewey.find({}, {name: 1, random: 1}, {new: true}, async (err, dd) => {
            //     if (err) {
            //         throw(err)
            // } 
            // else {
            //     // dd = await Dewey.findOneAndUpdate(query, data, function(err, doc) {
            //     //     if (err) return console.log("error: "+err);
            //         return console.log(dd.name+": "+dd.random);
            //     } 
            // })
            // console.log(printResults)
            res.redirect('/deweys/choose')
        }
    catch (err) {
        console.log(err) 
    }
})

router.get('/see', async (req, res) => {
    const ranks = await Rank.find({}).populate({path: 'dewey', model: 'Dewey'})

    res.json(ranks)
})

router.get('/see-one/:rank', async (req, res) => {
    const rank = req.params.rank
    const newRank = await Rank.find({"_id": rank})

    res.json(newRank)
})

// router.get('/selection1/:id', (req, res) => {
//     let dew1Id = req.params.id
//     app.locals.dew1Id = dew1Id
//     console.log(dew1Id)
//     res.end
// })

//     await new rankSchema(
//         win: 0,
//         loss: 0,
//         name: deweySchema
//     })



//     if(!ranks) {
//             deweys.forEach(dewey => {
//                 $set: {
//                     win: 0,
//                     loss: 0,
//                     winRate: 0
//                 }
//             })
//         }
//     try {
//         const ranks = await Rank.find({})


//         const ranksArray = Object.entries('ranks')
//         ranksArray.map(rank => rank).sort(a, b => a.winRate > b.winRate ? 1 : -1)

//         const init = 0
//         const second = 1
//         const penult = Object.keys(deweys).length - 2
//         const last = Object.keys(deweys).length - 1

//         const dArray = Object.entries('deweys')

//         const oBoxDeweyId = rankArray[init].fromEntries().id.toString()
//         const oBoxDewey = await find.Dewey({ id: oBoxDeweyId})

//         const bBoxDeweyId = rankArray[last].fromEntries().id.toString()
//         const bBoxDewey = await find.Dewey({ id: bBoxDeweyId})

//         const gBoxDeweyId = rankArray[second].fromEntries().id.toString()
//         const gBoxDewey = await find.Dewey({ id: gBoxDeweyId})

//         const yBoxDeweyId = rankArray[penult].fromEntries().id.toString()
//         const yBoxDewey = await find.Dewey({ id: yBoxDeweyId})

//         res.render('choose', { deweys, oBoxDeweyId: oBoxDeweyId, bBoxDeweyId: bBoxDeweyId, gBoxDeweyId: gBoxDeweyId, yBoxDeweyId: yBoxDeweyId })
//     }   catch  {
//         redirect('/')
//     }
// })

module.exports = router;

