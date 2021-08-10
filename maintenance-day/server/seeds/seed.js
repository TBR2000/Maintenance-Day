const { sequelize, mongoose } = require('../config/connection');
const { User, Assets, InstalledParts, Responses, Clients, Parts } = require('../models');
const assetData = require ('./assetData.json')
const partsData = require ('./partsData.json')
const responseData = require ('./responseData.json')
const clientData = require ('./clientData.json')
const costData = require ('./costData.json')
const userSeeds = require ('./userSeeds.json')

const seedDatabase = async () => {
mongoose.once('open', async () => {
  await Assets.deleteMany({});
  const Asset = await Assets.insertMany(assetData);
  console.log('Assets seeded!');

  await InstalledParts.deleteMany({});
  const part = await InstalledParts.insertMany(partsData);
  console.log('InstalledParts seeded!');

  await Responses.deleteMany({});
  const qAnA = await Responses.insertMany(responseData);
  console.log('responses seeded!');

  await User.deleteMany({});
  const users = await User.insertMany(userSeeds);
  console.log('users seeded!');

  process.exit(0);
});


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