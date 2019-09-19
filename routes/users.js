const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const db = require('../models');

// Register new
router.post('/register', (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  let errors = [];

  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      firstName,
      lastName,
      email,
      password,
      password2
    });
  } else {
    db.User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.json({
          errors,
          firstName,
          lastName,
          email,
          password,
          password2
        });
      } else {
        const newUser = {
          firstName,
          lastName,
          email,
          password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            console.log(newUser.firstName);
            db.User.create({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password
            })
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Register invitee
router.post('/register/:token', (req, res) => {
  const { firstName, lastName, email, password, password2 } = req.body;
  const token = req.params.token;
  let errors = [];

  db.Invites.findOne({ where: { token: token } }).then(user => {
    if (!user) {
      errors.push({ msg: 'Invite URL is incorrect' });
    }
  });

  if (!firstName || !lastName || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.json({
      errors,
      firstName,
      lastName,
      email,
      password,
      password2
    });
  } else {
    db.User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.json({
          errors,
          firstName,
          lastName,
          email,
          password,
          password2
        });
      } else {
        const newUser = {
          firstName,
          lastName,
          email,
          password
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            db.User.create({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              password: newUser.password
            })
              .then(user => {
                db.ServiceShare.bulkCreate(
                  invite.serviceIds.split(',').map(id => {
                    return {
                      invitorId: invite.userId,
                      inviteeId: user.id,
                      serviceId: id
                    };
                  })
                ).then(() => {
                  invite.destroy().then();
                });

                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// User login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
