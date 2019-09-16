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
        allServices = allServices.concat(userServices.map(service => {
            return {
                name: service.name,
                basePrice: service.basePrice,
                premiumPrice: service.premiumPrice,
                password: service.userService.password,
                priceSelected: service.userService.priceSelected,
            };
        }));

        // this wild boy query gets all the services that i've been invited to use,
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
          `, { raw: true }).then(results => {
            allServices = allServices.concat(results);

            console.log('ALL SERVICES', JSON.stringify(allServices));
        });
    });
});