const { sequelize, mongoose } = require('./config/connection');
const { Assets, InstalledParts, Responses, Clients, Parts } = require('../models');
const { assetData, partsData, responseData, clientData, costData } = require('./techData.json');

mongoose.once('open', async () => {
  await Assets.deleteMany({});
  const Asset = await Assets.insertMany(assetData);
  console.log('Assets seeded!');

  await InstalledParts.deleteMany({});
  const part = await InstalledParts.insertMany(partsData);
  console.log('InstalledParts seeded!');

  await Responses.deleteMany({});
  const qAnA = await Responses.insertMany(responseData);
  console.log('Assets seeded!');


  process.exit(0);
});

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Client = await Clients.bulkCreate(clientData, {
    individualHooks: true,
    returning: true,
  });

  const Part = await Parts.bulkCreate(costData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();