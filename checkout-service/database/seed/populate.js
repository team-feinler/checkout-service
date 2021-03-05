const CreateFakeData = require('./dataGenerator.js');
const Prinventory = require('../index.js');
const Mongoose = require('mongoose');


const DbSeed = async function() {

  let checkForPreviousSeedCount = await Prinventory.countDocuments();
  if (checkForPreviousSeedCount) {
    await Prinventory.db.dropDatabase();
  }

  let dataToSave = await CreateFakeData();
  //dataToSave is an array of objects. Each object is one record and looks like this:
  // { _id: 1, price: 18.99, inventory: 33 }

  Prinventory.insertMany(dataToSave)
    .then((result) => console.log(`Database seeded with ${result.length} items`))
    .catch((err) => console.error('Error seeding database', err))
    .finally(() => {
      console.log('Mongoose connection closing');
      Mongoose.connection.close();
    });

};

DbSeed();

module.exports = DbSeed;


