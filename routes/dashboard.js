require('dotenv');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const db = require('../models');

// Get all of the users services
router.get('/', (req, res) => {
  db.User.findOne({ where: { id: req.user.id } }).then(user => {
    let allServices = [];

    user.getServices().then(userServices => {
      allServices = allServices.concat(
        userServices.map(service => {
          return {
            name: service.name,
            basePrice: service.basePrice,
            premiumPrice: service.premiumPrice,
            password: service.userService.password,
            priceSelected: service.userService.priceSelected
          };
        })
      );
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
                    inner join services on services.id = serviceshares.serviceID
                where serviceshares.inviteeId = ${id};
            `
      )
      .then(results => {
        allServices = allServices.concat(results);

        // send allServices to the frontend
        res.json(allServices);
      });
  });
});

// Add a service
/* the frontend must collect an array of objects with the following data: 
    [{
      serviceId: 1,
      priceSelected: 'basicPrice' or 'premiumPrice',
      password: '',
    }] */
router.post('/addsub', (req, res) => {
  const ids = [];
  const info = {};

  req.body.data.forEach(d => {
    ids.push(d.serviceId);
    info[d.serviceId] = d;
  });

  db.User.findOne({ where: { id: req.body.userId } }).then(user => {
    db.Service.findAll({ where: { id: ids } }).then(service => {
      service.forEach(service => {
        user.addService(service, {
          through: info[service.id]
        });
      });
      res.send('success');
    });
  });
});

// Invite someone to join service (req.body must be an array of emails)
router.post('/invite', (req, res) => {
  const targetEmails = req.body;
  targetEmails.forEach(email => {
    db.User.createInvite({
      email: email,
      serviceIds: serviceId.join(',')
    }).then(invite => {
      // you probably send the email from here, make sure the invite link has the token in the url
      // something like: https://subsplit.com/invite/ + invite.token
      // that url ---------^ should display the user creation form

      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.TRANS_USER,
          pass: process.env.TRANS_PASS
        }
      });

      let mailOptions = {
        from: process.env.TRANS_USER,
        to: invite.email,
        subject: 'SubSplit Request',
        text: `Testing this out. Please visit localhost/3001/api/register/${invite.token}`
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send({ msg: 'Email has been sent' });
      });
    });
  });
});

// Retrieve shared password through email
router.get('/retrieve', (req, res) => {
  db.ServiceShare.findAll({ where: { id: id } }).then(pass => {});
});

module.exports = router;
