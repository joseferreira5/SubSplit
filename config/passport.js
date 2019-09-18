const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      db.User.findOne({
        where: { email: email }
      }).then(dbUser => {
        if (!dbUser) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, dbUser.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, dbUser);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findOne({ where: { id: id } }, function(err, user) {
      done(err, user);
    });
  });
};
