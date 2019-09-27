require('dotenv');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

const db = require('../models');

// Get all of the users services
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    req.user.getServices().then(userServices => {
      let allServices = userServices.map(service => {
        return {
          id: service.id,
          name: service.name,
          basePrice: service.basePrice,
          premiumPrice: service.premiumPrice,
          priceSelected: service.UserService.priceSelected,
          owner: true
        };
      });

      db.sequelize
        .query(
          `
          select
              services.id, services.name, services.basePrice, services.premiumPrice,
              userservices.priceSelected, serviceshares.invitorId as ownerId,
              concat(users.firstName, ' ', users.lastName) as ownerName
          from serviceshares
              inner join userservices on serviceshares.serviceId = userservices.serviceId
                and serviceshares.invitorId = userservices.userId
              inner join services on services.id = serviceshares.serviceId
              inner join users on serviceshares.invitorId = users.id
          where serviceshares.inviteeId = ${req.user.id};
          `
        )
        .spread(results => {
          console.log('results', results);
          allServices = allServices.concat(results);

          // send allServices to the frontend
          res.json(allServices);
        });
    });
  }
);

router.get('/services/', (req, res) => {
  db.Service.findAll({}).then(services => {
    res.json(services);
  });
});

// Add a service
/* the frontend must collect an object with the following data: 
    {
      serviceId: 1,
      priceSelected: 'basicPrice' or 'premiumPrice',
      password: '',
    } */
router.post(
  '/addsub',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { serviceId, priceSelected, username, password } = req.body;

    db.Service.findOne({ where: { id: serviceId } }).then(service => {
      req.user.addService(service, {
        through: {
          username,
          password,
          priceSelected
        }
      });

      res.status(200).json({
        id: service.id,
        name: service.name,
        basePrice: service.basePrice,
        premiumPrice: service.premiumPrice,
        priceSelected: priceSelected,
        owner: true
      });
    });
  }
);

// Invite someone to join service
router.post(
  '/invite',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { email, serviceId } = req.body;

    req.user
      .createInvite({
        email: email,
        serviceIds: serviceId
      })
      .then(invite => {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: invite.email,
          subject: 'SubSplit Request',
          html: `<h1>Testing this out</h1><p>Please click on this link <a href="https://sub-split.herokuapp.com/invite/${invite.token}">here.</a></p>`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.send('Email has been sent');
        });
      });
  }
);

// Retrieve shared password through email
router.post(
  '/retrieve',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { serviceId, ownerId } = req.body;

    db.UserService.findOne({
      where: { ServiceId: serviceId, UserId: ownerId }
    }).then(userService => {
      db.Service.findOne({
        where: { id: serviceId }
      }).then(service => {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        let mailOptions = {
          from: process.env.EMAIL_USER,
          to: req.user.email,
          subject: 'SubSplit Shared Login',
          html: `
            <h1>Testing this out</h1>
            <p>Showing the login info for ${service.name}:</p><br/>
            <p><strong>Username:</strong> ${userService.username}</p>
            <p><strong>Password: ${userService.password}</strong> 
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.status(200).json({
            msg: 'Shared login email was sent'
          });
        });
      });
    });
  }
);

module.exports = router;
