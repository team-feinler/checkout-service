const CreateFakeCouchData = require('./couchDataGenerator.js');
const { createConnectionToCouchDB } = require('../couch/couchConnection.js');
const nano = require('nano');

const DbSeed = async function(desiredNumberOfRecords, batchSize, startingId) {
  const prinventory = await createConnectionToCouchDB();

  const numBatches = desiredNumberOfRecords / batchSize;
  const copyOfRecords = desiredNumberOfRecords;
  // let currentBatch = 1;

  for (let i = 0; i < desiredNumberOfRecords; i+=batchSize) {
    let firstIndexInBatch = startingId;
    //dataToSave is an array of objects. Each object is one record and looks like this:
    // { id: 1, price: 18.99, inventory: 33 }
    try {
      let dataToSave = await CreateFakeCouchData(batchSize, firstIndexInBatch);
      await prinventory.bulk({docs: dataToSave})
      startingId+=batchSize;
      // currentBatch++;
    } catch (e) {
      console.log('Error seeding database', err);
    }
  }
  console.log('DATABASE SEEDING COMPLETE!');
};

//Seed 100,000 in batches of 1,000
// DbSeed(100000, 1000, 1);

//Seed 1,000,000 in batches of 1,0000
// DbSeed(1000000, 1000, 1);

//Seed 10,000,000 in batches of 1,0000
DbSeed(10000000, 1000, 1);