const url = require('url') 
const path = require('path')
const express = require('express')
// const expressLayouts = require('express-ejs-layouts');
var app = express()
const router = express.Router()
const ranks = require('./ranks')
// const { Agent } = require('https')
const mongoose = require('mongoose')
const Dewey = require('../models/dewey')
const Rank = require('../models/rank')
const bodyParser = require('body-parser');
const authenticateToken = require('../public/javascripts/authenticateToken')
const session = require('express-session')
const initialize = require('../public/javascripts/initialize')
const initProcess = require('../public/javascripts/imgSort')
const nextProcess = require('../public/javascripts/nextProcess')
const setGameToOn = require('../public/javascripts/setGameToOn')
const subMain = require('../public/javascripts/subMain')
const status = require('../public/javascripts/igStatus')
// const isItLastRound = require('../public/javascripts/isItLastRound')
const lastImgSort = require('../public/javascripts/lastImgSort')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const events = require('events')
const { restart } = require('nodemon')
const MongoDBSession = require('connect-mongodb-session')(session)
// const { db } = require('../models/dewey')
const toId = mongoose.Types.ObjectId
const chooseOrNotInitial = require('../public/javascripts/chooseOrNotInitial')
const chooseOrNotNext = require('../public/javascripts/chooseOrNotNext')
const passport = require('passport')
const flash = require('express-flash')

const store = new MongoDBSession({
  uri: process.env.DATABASE_URL,
  collection:"mysessions",
})

router.get('/', async (req, res) => {
  // if(useron) {
  //   useron = true
  // }
  // let start = 0
  // let searchOptions = {}
  // if (req.query.name != null && req.query.name !== '') {
  //   searchOptions.name = new RegExp(req.query.name, 'i')
  // }
  try {
      console.log('Made it this far')
      const deweys = await Dewey.find({}).sort({winRate:-1}).limit(12).exec()
      const useron = 0
      const messageonoff = 0
      // app.set('useron', useron)
      app.set('messageonoff', messageonoff)
      // start = start + 1
      
      res.render('index', {
        deweys: deweys, useron: useron, messageonoff: messageonoff
      })
    } catch (error) {
        console.log(error.message)
        res.send('Startup failed')
    }
})

router.use(
	session({
		secret: process.env.ACCESS_TOKEN_SECRET,
		resave: false,
		saveUninitialized: false,
		store: store,
    unset: 'destroy',
    cookie: {
      maxAge: 1000 * 60 * 60 *24
    }
  })
)

const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
      return next()
  } else {
      res.redirect('/users/user/loginForm')
  }
}

const redirectLogin = (req, res, next) => {
  if(!req.session.isAuth) {
      res.redirect('/users/user/loginForm')
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if (req.session.isAuth) {
    res.redirect('/deweys/deweys')
  } else {
    next()
  }
}

router.use((req, res, next) =>  {
  try {
    const messageonoff = 0
    res.locals.messageonoff = messageonoff
    app.set('messageonoff', res.locals.messageonoff)
  next()
} catch { 
    console.log('Internal server problem')
    res.redirect('/deweys/deweys')
  }
})
  


// router.get('/', async (req, res) => {
    // if(useron) {
    //   useron = true
    // }
    // let start = 0
    // let searchOptions = {}
    // if (req.query.name != null && req.query.name !== '') {
    //   searchOptions.name = new RegExp(req.query.name, 'i')
    // }
//     try {
//         const deweys = await Dewey.find({}).sort({winRate: -1}).limit(12).exec()
//         const useron = 0
//         app.set('useron', useron)
//         // start = start + 1

//         res.render('index', {
//           deweys: deweys, useron: useron
//         })
//       } catch {
//           console.log('Startup failed')
//           res.end()
//       }
//  })

 router.get('/deweys', isAuth, async (req, res) => {
    try {
      const deweys = await Dewey.find({}).sort({winRate:-1}).limit(12).exec()
      const useron = 3
      res.render('index', { deweys: deweys, useron: useron } )
    }
    catch (error) {
      console.log(error)
      res.status(404).redirect('/')
    }
 })

router.get('/choose', isAuth, initialize, chooseOrNotInitial, async (req, res) => {
  // const rofProxy = []
  try {
        const deweys = await Dewey.find({}).sort({random: -1})
        .limit(8)
        // .exec()

        const dData = Array.from(deweys)
        // rofProxy.push(...dData)

        // app.set('inGame', true)
        // console.log(app.locals.settings.inGame)
        initProcess(res, dData)
        // res.render('choose', { deweys: deweys, dewey1: dewey1, dewey2: dewey2, dewey3: dewey3, dewey4: dewey4} )        
        // next()
        //res.end
    } 
    // myEmitter.emit('load')
     catch (error) {
      console.log(error)             //'Error has occurred'
      res.end
    } 
  })

// The next choose route
// router.get('/choose', chooseOrNotNext, (req, res, next) => {
//             try {
//             console.log('Is this working?')  //roundOneFeed[2]
//             // nextProcess(res)
//             } catch {
//               console.log('Process has ended')
//               res.end
//             }
//             next()
//   })

// GETTING INDEX DATA FOR WIN/LOSS AUGMENTATION
  router.get('/selection1/:id', (req, res) => {
    const params = req.params
    let prevReq
    if(typeof prevReq !== undefined) {
      prevReq=null
    }
    try {
      let dew1Id = req.params.id
      app.set('dew1Id', dew1Id)
      console.log(req.app.locals.inGame)
      const dweyIndex1 = roundOneFeed.findIndex(dwey => dwey.id == dew1Id)
      // roundOneFeed.find(dwey => dwey.id === dew1Id).inGameWin += 1      
      // console.log(dwey1.id)
      console.log(app.locals.settings.dew1Id)
      console.log(dew1Id, dweyIndex1)
      app.set('dweyIndex1', dweyIndex1)      
      // roundOneFeed[dwey1].inGameLoss = 0
      // roundOneFeed[dwey1].inGameWin += 1
      res.status(200).end()
      const prevReq = params
    } catch (err) {
      console.log(err)               //'Error getting selection row 1 data.'
      res.end()
    }
})

router.get('/selection2/:id', (req, res) => {
  const params = req.params
  let prevReq2
  if(typeof prevReq2 !== undefined) {
    prevReq2=null
  }
  try {
    let dew2Id = req.params.id
    app.set('dew2Id', dew2Id)

    const dweyIndex2 = roundOneFeed.findIndex(dwey => dwey.id == dew2Id)
    // roundOneFeed.findIndex(dwey => dwey.id == dew2Id).inGameWin += 1
      // console.log(dwey2.id)
    console.log(dew2Id, dweyIndex2)
    app.set('dweyIndex2', dweyIndex2)      
    res.status(200).end()
    const prevReq2 = params    
  } catch {
    console.log('Error getting selection row 2 data.')
    res.end()
  }
})

//   router.get('/selection2/:1d', (req, res) => {
//     try {
//       let dew1Id = req.params.id
//       app.locals.dew1Id = dew1Id
//       console.log(dew1Id)
//       res.end
//     } catch{
//       console.log('Error getting selection row 2 data.')
//       res.end
//     }
// })  
  

//New Dewey Route
router.get('/new', async (req, res) => {
  try {
      const useron = 10
      res.render('new', {useron: useron})
  } catch {
      res.redirect('/')
  }
})    

// router.get('/:id', async (req, res) => {
//     try {
//           const dewey = await Dewey.findById(req.params.id)
//           const deweys = await Dewey.find({})
//           res.render('show', { dewey: dewey, deweys })
//   } catch {
//             res.send('Error getting new Dewey')
//   }
// })
  

router.post('/join', async (req, res) => {
  console.log(mongoose.connection.readyState)

        const dewey = new Dewey({
        name: req.body.name,
        age: req.body.age,
        hobby: req.body.hobby,
        city: req.body.city,
        state: req.body.state,
        winRate: 0,
        rank: 0
    })
    // console.log(dewey.state)
    // console.log(req.body.picture != null && req.body.picture !== "")
    console.log('We are close')
    saveImage(dewey, req.body.picture)    
  try { 
    // dewey.pictureImage = pictureImage
    // dewey.pictureImageType = pictureImageType
    // console.log(dewey.picture !==null && dewey.picture !=="")
    console.log('We are even closer')
    const newDewey = await dewey.save()
    const useron = 10
    res.render('show', {id: newDewey.id, name: newDewey.name, age: newDewey.age, hobby: newDewey.hobby, city: newDewey.city, state: newDewey.state, pictureImagePath: newDewey.pictureImagePath, useron: useron} )
    // console.log('We are really close')
    // res.json("We are really close!")
    } 
    catch {
        res.redirect('/deweys')
    }
  })

    router.get('/show/:name', async (req, res) => {
      try {
        const dewey = await Dewey.findOne({name: req.params.name})
        
        const name = dewey.name
        const age = dewey. age
        const hobby = dewey.hobby
        const city = dewey.city
        const state = dewey.state
        const pictureImagePath = dewey.pictureImagePath

        const useron = 3
        res.render('show', { name, age, hobby, city, state, pictureImagePath, useron: useron } )

      }
      catch {

      }
    })

    router.post('/submittal/selected', setGameToOn, status, subMain, nextProcess,  (req, res, next) => {
      // if(req.app.locals.inGame=true && nextRoundFeed < 3) {
      //   console.log('ready to wind it up')
      // }
      app.set('inGame', req.app.locals.inGame)      
      // isItLastRound(req, res, next)
      try {
        //Set locals variables for render
        // app.set('inGame', false)
        console.log('In-game status:'+" "+app.locals.settings.inGame)
        
        
        const name1 = res.locals.name1
        const name2 = res.locals.name2
        const name3 = res.locals.name3
        const name4 = res.locals.name4

        const pictureImagePath1 = res.locals.pictureImagePath1
        const pictureImagePath2 = res.locals.pictureImagePath2
        const pictureImagePath3 = res.locals.pictureImagePath3
        const pictureImagePath4 = res.locals.pictureImagePath4

        const id1 = res.locals.id1
        const id2 = res.locals.id2
        const id3 = res.locals.id3
        const id4 = res.locals.id4
      } 
      catch {
        console.log('Where do we go from here')  //Error transferring data feed
        res.end
    } 
    next()
  })

  // router.post('/submittal/chooseFinal', (req, res, next) =>  {
  //   try{
  //       const id1 = nextRoundFeed[0].id
  //       const id2 = nextRoundFeed[1].id

  //       const pictureImagePath1 = nextRoundFeed[0].pictureImagePath
  //       const pictureImagePath2 = nextRoundFeed[1].pictureImagePath

  //       res.render('lastChoose', id1, id2, pictureImagePath1, pictureImagePath2)
  //   } catch {
  //     res.redirect('/')
  //   }
  //   next()
  // })

  router.get('/submittal/lasttwodew', (req, res) => {
    try {
      const dData = nextRoundFeed
      console.log('NRFL: '+ nextRoundFeed.length)
      lastImgSort(res, dData)
  } 
    catch {
      console.log("Last process failed.")
      res.send('That really did not work')
  }
})

  router.get('/submittal/final/:id', async (req, res) => {
    try {
          const id = req.params.id
          const winner = nextRoundFeed.find(dwy => dwy.id === id)
          const runnerUp = nextRoundFeed.find(dwy => dwy.id !== id)

          const name = winner.name
          const picureImagePath = winner.pictureImagePath

          const winStat = roundOneFeed.find(dwy => dwy.id===winner.id)
          winStat.inGameWin += 1

          const lossStat = roundOneFeed.find(dwy => dwy.id===runnerUp.id)
          lossStat.inGameLoss = 1    //could be eliminated but may have future use

          await Dewey.findOneAndUpdate({'name': runnerUp.name}, {  $inc: {"win": runnerUp.inGameWin, "loss": 1}} )
              .then(console.log(runnerUp.name+" was updated."))

          await Dewey.findOneAndUpdate({'name': winner.name}, {  $inc: {"win": winner.inGameWin, "loss": 0}} )
              .then(console.log(winner.name+" was updated."))

          roundOneFeed = null
          nextRoundFeed = null

          res.render('lastChoose', name, pictureImagePath)
        } 
          catch {
            console.log('Something went wrong here.')
        }
  })

  // router.use('/submittal', isItLastRound)
    // router.use( async (error, req, res) => {
    //   try {
    //       console.log(req.app.locals.inGame)
    //       console.log(id4)
    //       // var nextDewey = nextProcess(res)
    //       // router.route('/choose').get(() => console.log('Who knew'))
    //       // res.render('choose', { pictureImagePath1, pictureImagePath2, pictureImagePath3, pictureImagePath4, name1, name2, name3, name4, id1, id2, id3, id4  } )
    //       // next()
    //   } catch {
    //       console.log('Error transferring data feed')  //Error transferring data feed
    //       return
    //   }
      
    // })    
// Delete route
// router.post('/:id', async (req, res) => {
//   try {
//           // const deweys = await Dewey.find({})            
//           const dewey = await Dewey.findById(req.params.id)
//           await dewey.remove()
//           res.redirect('/')
//   } catch {
//       res.render('show', { dewey: dewey })
//   }

// })    

// router.use('/gameOn', setGameToOn)

// router.use(error, req, res) {

// }

router.use((error, req, res) => {
    if (error) {
      console.log('error from server routes');               /*'error from server routes'*/
    } else {
    res.redirect('/deweys')
    }
  })

// function keepGameOpen (req, res, next) {
//   console.log (app.locals.settings.inGame)
//   next()
// }

// function errorHandle (err, req, res) {
//   if (err) {
//     console.log(err.message)
//   } else {
//   res.end
//   }
// }

function saveImage(dewey, pictureEncoded) {
	
  if (pictureEncoded == null) return
	  const picture = JSON.parse(pictureEncoded)
    .then(console.log('Encoded image received'))  
    // console.log(picture.data !== null)
  if (picture !== null && imageMimeTypes.includes(picture.type)) {
      dewey.pictureImage = new Buffer.from(picture.data, 'base64')
      dewey.pictureImageType = picture.type
    }
  //   console.log(pictureImage !== null)
	// 	dewey.pictureImageType = picture.type
  //   return {pictureImage, pictureImageType}
	// } catch {
  //   console.log("No data or incorrect data submitted.")
  //   return
  }

module.exports = router