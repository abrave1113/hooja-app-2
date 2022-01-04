const url = require('url') 
const path = require('path')
const express = require('express')
var app = express()
const router = express.Router()
const ranks = require('./ranks')
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
const lastImgSort = require('../public/javascripts/lastImgSort')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const events = require('events')
const { restart } = require('nodemon')
const MongoDBSession = require('connect-mongodb-session')(session)
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
try {
      console.log('Made it this far')
      const deweys = await Dewey.find({}).sort({winRate:-1}).limit(12).exec()
      const useron = 0
      const messageonoff = 0
      app.set('messageonoff', messageonoff)
      
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
  try {
        const deweys = await Dewey.find({}).sort({random: -1})
        .limit(8)

        const dData = Array.from(deweys)

        initProcess(res, dData)
    } 

     catch (error) {
      console.log(error)
      res.end
    } 
  })

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
      console.log(app.locals.settings.dew1Id)
      console.log(dew1Id, dweyIndex1)
      app.set('dweyIndex1', dweyIndex1)      
      res.status(200).end()
      const prevReq = params
    } catch (err) {
      console.log(err)
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
    console.log(dew2Id, dweyIndex2)
    app.set('dweyIndex2', dweyIndex2)      
    res.status(200).end()
    const prevReq2 = params    
  } catch {
    console.log('Error getting selection row 2 data.')
    res.end()
  }
})

router.get('/new', async (req, res) => {
  try {
      const useron = 10
      res.render('new', {useron: useron})
  } catch {
      res.redirect('/')
  }
})    

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

    console.log('We are close')
    saveImage(dewey, req.body.picture)    
  try { 

    console.log('We are even closer')
    const newDewey = await dewey.save()
    const useron = 10
    res.render('show', {id: newDewey.id, name: newDewey.name, age: newDewey.age, hobby: newDewey.hobby, city: newDewey.city, state: newDewey.state, pictureImagePath: newDewey.pictureImagePath, useron: useron} )

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

      app.set('inGame', req.app.locals.inGame)      

      try {
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
        console.log('Where do we go from here')
        res.end
    } 
    next()
  })

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
          const winner = await nextRoundFeed.find(dwy => dwy.id == id)
          const runnerUp = await nextRoundFeed.find(dwy => dwy.name !== winner.name)

          const name = winner.name
          const pictureImagePath = winner.pictureImagePath

          const winStat = await roundOneFeed.find(dwy => dwy.id===winner.id)
          winStat.inGameWin += 1

          const lossStat = await roundOneFeed.find(dwy => dwy.id===runnerUp.id)
          lossStat.inGameLoss = 1    //could be eliminated but may have future use

          await Dewey.findOneAndUpdate({'name': runnerUp.name}, {  $inc: {"win": runnerUp.inGameWin, "loss": 1}} )
              .then(console.log(runnerUp.name+" was updated."))

          await Dewey.findOneAndUpdate({'name': winner.name}, {  $inc: {"win": winner.inGameWin, "loss": 0}} )
              .then(console.log(winner.name+" was updated."))

          res.render('lastChoose', name, pictureImagePath)
        } 
          catch {
            console.log('Something went wrong here.')
        }
  })

router.use((error, req, res) => {
    if (error) {
      console.log(error.message);               /*'error from server routes'*/
    } else {
      if (app.get("inGame") == false) {
      roundOneFeed = null
      nextRoundFeed = null
      // res.redirect('/deweys')
    }
    console.log("No server errors")
  }
})

function saveImage(dewey, pictureEncoded) {
	
  if (pictureEncoded == null) return
	  const picture = JSON.parse(pictureEncoded)
    .then(console.log('Encoded image received'))  

  if (picture !== null && imageMimeTypes.includes(picture.type)) {
      dewey.pictureImage = new Buffer.from(picture.data, 'base64')
      dewey.pictureImageType = picture.type
    }
  }

module.exports = router