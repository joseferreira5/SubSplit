require('dotenv');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
    res.status(400).json({
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
                res.json({
                  success: true
                });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// accept invitation
router.post(
  '/invite/:token/accept',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const token = req.params.token;
    const { user } = req;

    db.Invites.findOne({ where: { token: token } }).then(invite => {
      if (!invite) {
        res.status(404).json({ msg: 'Invite URL is incorrect' });
        return;
      }

      db.ServiceShare.bulkCreate(
        invite.serviceIds.split(',').map(id => {
          return {
            invitorId: invite.UserId,
            inviteeId: user.id,
            serviceId: id
          };
        })
      ).then(() => {
        invite.destroy().then(() => {
          res.json({
            msg: 'Invite accepted successfully'
          });
        });
      });
    });
  }
);

// Get User Info
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const user = {
      user: {
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email
      }
    };
    res.json(user);
  }
);

// User login
router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) {
      console.log(err);
    }

    if (info !== undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      req.logIn(user, err => {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).send({
          auth: true,
          token: token,
          user: {
            name: user.firstName + ' ' + user.lastName,
            email: user.email
          },
          message: 'Login successful'
        });
      });
    }
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  console.log('user is logged out');
  res.json({
    message: 'Logout successful'
  });
});

module.exports = router;
