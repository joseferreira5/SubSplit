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
    const { serviceId, priceSelected, password } = req.body;

    db.Service.findOne({ where: { id: serviceId } }).then(service => {
      req.user.addService(service, {
        through: {
          password,
          priceSelected
        }
      });

      res.status(200).json({
        success: true
      });
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
            html: `<h1>Testing this out</h1><p>Please visit https://sub-split.herokuapp.com/user/register/${invite.token}</p>`
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
