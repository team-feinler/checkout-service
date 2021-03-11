const CreateFakeData = require('./dataGenerator.js');
const { createAndConnectToDatabase } = require ('../couchConnection.js');
const nano = require('nano');

const DbSeed = async function() {
  const prinventory = await createAndConnectToDatabase();
  let dataToSave = await CreateFakeData();
  //dataToSave is an array of objects. Each object is one record and looks like this:
  // { _id: 1, price: 18.99, inventory: 33 }

  prinventory.bulk({docs: dataToSave})
    .then((result) => console.log(`Database seeded with ${result.length} items`))
    .catch((err) => console.error('Error seeding database', err))
};

DbSeed();

module.exports = DbSeed;