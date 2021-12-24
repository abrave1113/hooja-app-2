const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initializeP(passport, getUserByUsername) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No user with that email'})
        }
        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done( null, false, {message: 'Login credentials do not match'})
            }
        }
        catch(e) {
                return done(e)
        }
    }    
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));
 
    passport.serializeUser((user, done) => { })
    passport.deserializeUser((id, done) => { })
}

module.exports = initializeP