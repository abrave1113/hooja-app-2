require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const webdriver = require('selenium-webdriver')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)

require('dotenv').config()

const expressLayouts = require('express-ejs-layouts');
const imageMimeTypes = ['image/jpg', 'image/jpeg','image/png','image/gif' ]
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const deweysRouter = require('./routes/deweys');
const ranksRouter = require('./routes/ranks');
const usersRouter = require('./routes/users');
const store = new MongoDBSession({
    uri: process.env.DATABASE_URL,
    collection:"mysessions",
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.use(express.static( 'public'));
app.use(express.urlencoded({ limit: '500mb', extended: false }));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/index', indexRouter )
app.use('/users', usersRouter )
app.use('/deweys', deweysRouter )
app.use('/ranks', ranksRouter)

app.options('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.header('Access-Control-Allow-Credentials', true);
    next()
});

app.use(
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

app.get('/', (req, res) => {
    try {
        res.redirect('/deweys')
    } catch {
        res.send('Sorry, connection error')
    }
})

const PORT = process.env.PORT || 6001
app.listen(PORT, console.log(`Connected on port ${PORT}...`) )

module.exports = app