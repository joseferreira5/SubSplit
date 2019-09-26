require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const db = require('../models');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      session: false
    },
    (email, password, done) => {
      console.log('PASPORT');
      // Match user
      db.User.findOne({
        where: { email: email }
      })
        .then(dbUser => {
          if (!dbUser) {
            return done(null, false, {
              message: 'That email is not registered'
            });
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
        })
        .catch(e => console.error(e));
    }
  )
);

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, done) => {
      db.User.findOne({
        where: { id: jwtPayload.id }
      })
        .then(dbUser => {
          if (!dbUser) {
            return done(null, false, {
              message: 'That email is not registered'
            });
          }

          return done(null, dbUser);
        })
        .catch(e => console.error(e));
    }
  )
);
