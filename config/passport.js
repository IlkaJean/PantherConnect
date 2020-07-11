const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userService = require('../service/userService');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      console.log('Auth local');
      userService.findUser(email, (user) =>{
        if (user){
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                console.log('match!')
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password incorrect' });
              }
            });
        } else{
          return done(null, false, { message: 'User does not exist' });
        }
      })
    })
  );

  passport.serializeUser(function(user, done) {
    console.log('Ser');
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    console.log('Des');
    var user = userService.findUser(email, (user) =>{
      done(null, user);
    });
    
  });
};