// if (process.env.NODE_ENV !== 'production') {
// require('dotenv').config()
// };

const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 
require('dotenv').config()

const bodyParser = require('body-parser');

// const deweysRouter = require('./routes/deweys');
// const ranksRouter = require('./routes/ranks');
// const usersRouter = require('./routes/users');

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');
// app.use(methodOverride('_method'));
// app.use(expressLayouts);
// app.use(expressCspHeader( {
//     policies: {
//         'default-src': [expressCspHeader.NONE],
//         'img-src': ['data:', expressCspHeader.SELF],
//     }
// } ));
app.use(express.static( 'public'));
app.use(express.urlencoded({ limit: '500mb', extended: false }));
app.use(express.json());

const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.post('user/loginForm', (req, res) => {
    try{
        const name = req.body.name
        const password = req.body.password

        const useron = 1
        app.set('useron', useron)
        res.render('index', useron)
    }
    catch {

    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
             res.send('Not allowed')
        }
    }
    catch {
        res.status(500).send()
    }
})

app.post('/login', (req, res) => {

    const username = req.body.username
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

const PORT = process.env.PORT || 7001
app.listen(PORT, console.log(`Connected on port ${PORT}...`) )

// module.exports = app