const db = require('../models');

module.exports = function (app) {
    // Get all of the users services
    app.get('/api/dashboard/', (req, res) => {
        if (!req.user) {
            res.json({});
        }

        db.User.findOne({ where: { id: req.user.id } }).then(user => {
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
            });

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
    app.post('/api/dashboard/addsub', (req, res) => {
        const ids = [];
        const info = {};

        req.data.forEach(d => {
            ids.push(d.serviceId);
            info[d.serviceId] = d;
        });

        db.Service.findAll({ where: { id: ids } }).then(services => {
            services.forEach(service => {
                user.addService(service, {
                    through: info[service.id],
                });
            });
        });
    });

    // Invite someone to join service (req.body must be an array of emails)
    app.post('/api/dashboard/invite', (req, res) => {
        const targetEmails = req.body;

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
    });
}
