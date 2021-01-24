const { expect, assert } = require('chai');
const createFakeData = require('../database/seed/dataGenerator.js');
const mongoose = require('mongoose');
const db = 'mongodb://localhost/prinventory';
const Prinventory = require('../database/index.js');
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

describe('Database seeding', () => {

  let fakeData;

  describe('Generate fake data', () => {

    it('should generate 100 fake primary records with the correct structure and properties of the correct type to be used for database seed', () => {

      fakeData = createFakeData();

      assert.lengthOf(fakeData, 100, 'fakeData contains 100 items');

      fakeData.forEach(fakeProduct => {
        assert.hasAllKeys(fakeProduct, ['id', 'price', 'inventory'], 'Contains the correct structure per database schema');
        assert.typeOf(fakeProduct.id, 'number', 'property should be of type number');
        assert.typeOf(fakeProduct.price, 'number', 'property should be of type number');
        assert.typeOf(fakeProduct.inventory, 'number', 'property should be of type number');
      });
    });
  });

  describe('Seeding database with fake data', () => {

    before(async () => {
      await Prinventory.db.dropDatabase();
    });

    it('should contain 100 records after seeding', async () => {
      await Prinventory.insertMany(fakeData);
      let dbRecordsCount = await Prinventory.countDocuments();
      assert(dbRecordsCount === 100, 'record count should be 100');
    });

    after(async () => {
      await mongoose.connection.close();
    });
  });
});