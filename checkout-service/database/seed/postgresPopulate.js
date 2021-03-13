const CreateFakeData = require('./postgresDataGenerator.js');
const { Sequelize } = require('sequelize');
const { establishConnection, testConnection, closeConnection } = require('../postgres/postgresConnection.js');
const { syncModels, addMultipleRecords } = require('../postgres/postgresModel.js');

const DbSeed = async function() {
  const prinventory = establishConnection();
  await syncModels();

  let dataToSave = await CreateFakeData();
  //dataToSave is an array of objects. Each object is one record and looks like this:
  // { id: 1, price: 18.99, inventory: 33 }

  await addMultipleRecords(dataToSave)
    .then((result) => console.log(`Database seeded with ${result} items`))
    .catch((err) => console.error('Error seeding database', err))
    .finally(() => closeConnection(prinventory))
};

DbSeed();

module.exports = DbSeed;

