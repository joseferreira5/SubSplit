/*
    db.users.create({
        firstName: 'Jose',
        lastName: 'Ferreira',
        email: 'jferreira@gmail.com',
        password: 'buttz123',
    });

    db.service.bulkCreate([{
        name: 'Netflix',
        basePrice: 12.99,
        premiumPrice: 15.99,
    }, {
        name: 'Hulu',
        basePrice: 5.99,
        premiumPrice: 11.99,
    }, {
        name: 'HBO Now',
        basePrice: 14.99,
    }]);
    */

/*const id = 1;
db.sequelize.query(`
    select
        services.name, services.basePrice, services.premiumPrice,
        userservices.password, userservices.priceSelected
    from serviceshares
        inner join userservices on serviceshares.serviceId = userservices.serviceId
            and serviceshares.invitorId = userservices.userId
        inner join services on services.id = serviceshares.serviceID
    where serviceshares.inviteeId = ${id};
`, {
    model: db.service,
    mapToModel: true,
}).then(results => {
    console.log(results);
});

db.users.findOne({ where: { firstName: 'Jose' }}).then(user => {
    db.service.findAll({ where: { id: [4] }}).then(services => {
        services.forEach(service => {
            user.addService(service, {
                through: {
                    password: 'unomas',
                    priceSelected: 'basePrice',
                },
            });
        });
    });

    user.getServices().then(services => {
        console.log('SERVICES', services[0].userService.password);
    });
});*/

const id = 5;
db.users.findOne({ where: { id: id } }).then(user => {
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

    // this query gets all the services that i've been invited to use,
    // including their passwords and priceSelecteds
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
          `,
        { raw: true }
      )
      .then(results => {
        allServices = allServices.concat(results);

        console.log('ALL SERVICES', JSON.stringify(allServices));
      });
  });
});

/*
  // adding passwords for services
  // the frontend must collect an array of objects with the following data: 
  // [{
  //   serviceId: 1,
  //   priceSelected: 'basicPrice' or 'premiumPrice',
  //   password: '',
  // }]
  const ids = [];
  const info = {};

  request.data.forEach(d => {
    ids.push(d.serviceId);
    info[d.serviceId] = d; 
  });

  db.service.findAll({ where: { id: ids }}).then(services => {
    services.forEach(service => {
      user.addService(service, {
        through: info[service.id],
      });
    });
  });  

  // the 'user' comes from the session
  // create a pending invite for a user with a list of service ids
  // if you have an array of emails, you would just forEach it
  targetEmails.forEach(email => {
    user.createInvite({
      email: email,
      serviceIds: serviceIds.join(','),
    }).then(invite => {
      // you probably send the email from here, make sure the invite link has the token in the url
      // something like: https://subsplit.com/invite/ + invite.token
      // that url ---------^ should display the user creation form
    });
  });

  // accept a pending invite as an invitee involves creating a new user
  // you'll get the token, firstName, lastName, email and password for the user from the frontend
  db.invites.findOne({ where: { token: token }}).then(invite => {
    db.users.create({
      firstName,
      lastName,
      email,
      password
    }).then(user => {
      db.serviceShare.bulkCreate(invite.serviceIds.split(',').map(id => {
        return {
          invitorId: invite.userId,
          inviteeId: user.id,
          serviceId: id,
        };
      })).then(() => {
        invite.destroy().then(return the response);
      });
    });
  });

  // get a user's list of services
  db.users.findOne({ where: { id: id }}).then(user => {
    let allServices = [];

    user.getServices().then(userServices => {
      allServices = allServices.concat(userServices.map(service => {
        return {
          name: service.name,
          basePrice: service.basePrice,
          premiumPrice: service.premiumPrice,
          password: service.userService.password,
          priceSelected: service.userService.priceSelected,
        };
      }));

      // this query gets all the services that i've been invited to use,
      // including their passwords and priceSelecteds
      db.sequelize.query(`
        select
            services.name, services.basePrice, services.premiumPrice,
            userservices.password, userservices.priceSelected
        from serviceshares
            inner join userservices on serviceshares.serviceId = userservices.serviceId
                and serviceshares.invitorId = userservices.userId
            inner join services on services.id = serviceshares.serviceID
        where serviceshares.inviteeId = ${id};
      `).then(results => {
        allServices = allServices.concat(results);

        // send allServices to the frontend
        res.send(allServices);
      });
    });
  });
*/
