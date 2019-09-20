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
          name: service.name,
          basePrice: service.basePrice,
          premiumPrice: service.premiumPrice,
          password: service.UserService.password,
          priceSelected: service.UserService.priceSelected
        };
      });

      db.sequelize
        .query(
          `
                  select
                      services.name, services.basePrice, services.premiumPrice,
                      userservices.password, userservices.priceSelected
                  from serviceshares
                      inner join userservices on serviceshares.serviceId = userservices.serviceId
                        and serviceshares.invitorId = userservices.userId
                      inner join services on services.id = serviceshares.serviceId
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

// Add a service
/* the frontend must collect an array of objects with the following data: 
    [{
      serviceId: 1,
      priceSelected: 'basicPrice' or 'premiumPrice',
      password: '',
    }] */
router.post(
  '/addsub',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const ids = [];
    const info = {};

    req.body.data.forEach(d => {
      ids.push(d.serviceId);
      info[d.serviceId] = d;
    });

    db.Service.findAll({ where: { id: ids } }).then(service => {
      service.forEach(service => {
        req.user.addService(service, {
          through: info[service.id]
        });
      });
      res.send('success');
    });
  }
);

// Invite someone to join service (req.body must be an array of emails)
router.post(
  '/invite',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { targetEmails, serviceIds } = req.body;

    targetEmails.forEach(email => {
      req.user
        .createInvite({
          email: email,
          serviceIds: serviceIds.join(',')
        })
        .then(invite => {
          // you probably send the email from here, make sure the invite link has the token in the url
          // something like: https://subsplit.com/invite/ + invite.token
          // that url ---------^ should display the user creation form

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
            text: `Testing this out. Please visit localhost/3001/api/user/register/${invite.token}`
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
    });
  }
);

// Retrieve shared password through email
router.get(
  '/retrieve',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    db.ServiceShare.findAll({ where: { id: id } }).then(pass => {});
  }
);

module.exports = router;
