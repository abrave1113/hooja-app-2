const express = require('express');
const app = express();
const router = express.Router();
const Dewey = require('../models/dewey');
const Rank = require('../models/rank');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const authenticateToken = require('../public/javascripts/authenticateToken.js')

const store = new MongoDBSession({
        uri: process.env.DATABASE_URL,
        collection:"mysessions",
})

let cookieDefaults = {
    httpOnly: true,
}

router.use(express.json());

router.use(
	session({
		secret: process.env.ACCESS_TOKEN_SECRET,
		resave: false,
		saveUniinitialized: false,
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

router.use((req, res, next) =>  {
    try {
        const messageonoff = 0
        res.locals.messageonoff = messageonoff
        app.set('messageonoff', res.locals.messageonoff)
        next()
  } catch {
        console.log('Internal server problem')
        res.redirect('/deweys')
    }
  })

const redirectLogin = (req, res, next) => {
    if(!req.session.isAuth) {
        res.redirect('/users/user/loginForm')
    }else {
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
    
const posts = [
        {
            username: 'Andrew',
            title: 'Post 1'
        },
        {
            username: 'Kyle',
            title: 'Post 2'
        }
    ]
            
    router.get('/posts', authenticateToken, (req, res) => {
        res.json(posts.filter(post => post.username == req.app.locals.user.name))
    })


    router.get('/', (req, res) => {
        console.log(req.session)
        res.status(200).end()
    })
    
    router.get('/user/loginForm', async (req, res) => {
        try {
            const useron = 1
            const deweys = await Dewey.find({}).sort({winRate: -1}).limit(12).exec()                    
            res.render( 'index', { deweys: deweys, useron: useron } )
        }
        catch {
            console.log('Login is unavailable')
            res.redirect('/deweys')
        }
    })

    router.get('/about', (req, res) => {
        try {
            const useron = 10
            res.render('about', {useron: useron} )
        }
        catch {
            console.log('About page rendered')
            res.redirect('/deweys')
        }
    })


    router.post('/users', async (req, res) => {

        const deweys = await Dewey.find({}).sort({winRate:-1}).limit(12).exec()        

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // const salt = await bcrypt.genSalt()
            const username = req.body.username
            const name = req.body.name
            const password = hashedPassword

            const user = new User({
                username: username, 
                name: name, 
                password: password
            })

            const newUser = await user.save()
            const useron = 2

            console.log('User successfully created', user)
            res.render('index', { deweys: deweys, useron: useron } )
        }
        catch (error) {
            console.log("Could not generate user")
            res.redirect('/users/user/loginForm')
        }
        
    })

    
    router.post('/users/login', redirectHome, async (req, res, next) => {
        const authUser = await User.findOne( {username: req.body.username} )
        if (typeof(authUser) === 'undefined') {
            return res.redirect('/deweys')
        }

        try {
            if(await bcrypt.compare(req.body.password, authUser.password)) {
                return next()
            } 
                else {
                    console.log('not authorized')
                    res.redirect('/users/user/loginForm')                    
            }
        }
        catch (error) {
            console.log('Cannot find user ', error)
            res.redirect('/users/user/loginForm')
        }
    }, async (req, res, next) => {
            const username = req.body.username
            const user = {username: username}
            const useron = 3
        try {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            const deweys = await Dewey.find({}).sort({winRate: -1}).limit(12).exec()                            

            req.session.isAuth = true

            const { userId } = req.session
            console.log(userId)

            res.cookie('access_token', accessToken)
            res.redirect('/deweys/deweys')
        }
        catch (error) {
            console.log('Cannot authorize user ')
            next(error)
            res.status(404).redirect('/deweys')
        }
    })

    router.get('/logout', async (req, res, next) => {
        const deweys = await Dewey.find({}).sort({winRate:-1}).limit(12).exec()        
        const useron = 0
        const messageonoff = 1
        app.set('messageonoff', messageonoff)
        res.render('index', { deweys:deweys, useron:useron, messageonoff:messageonoff })
    })

    router.get('/users/logout', async function (req, res) {
        try {
        const deweys = await Dewey.find({}).sort({winRate:-1}).limit(12).exec()                
        req.session.destroy((err) => {
            if(err) throw err
            console.log('Successfully ended session')
        })
        const useron = 0
        const messageonoff = 0
        app.set('messageonoff', res.locals.messageonoff)
        let now = Date.now() - 10 * 60 * 1000
        let expired = new Date(now);
        let cookieOpts = Object.assign({}, cookieDefaults, {expires: expired})

        res.cookie('connect.sid', '', cookieOpts)
        res.render('index', { deweys:deweys, useron:useron, messageonoff:messageonoff })
    } catch (e) {
        console.log(e)
        res.redirect('/deweys')
    }
} )
    
    router.use((error, req, res) => {
        if (error) {
          console.log(error);
        } else {
        res.end
        }
      })

module.exports = router
    