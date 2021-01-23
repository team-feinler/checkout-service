const { expect } = require('chai');
const { assert } = require('chai');
const createFakeData = require('../database/seed/dataGenerator.js');
const DbSeed = require('../database/seed/populate.js');
const Mongoose = require('mongoose');
const Db = 'mongodb://localhost/prinventory';
const Prinventory = require('../database/index.js');

describe('Database seeding', () => {

  describe('Generate fake data', () => {
    it('should generate 100 fake primary records with the correct structure with properties of the correct type to be used for database seed', () => {

      let fakeData = createFakeData();

      assert.lengthOf(fakeData, 100, '100 items generated');
      fakeData.forEach(fakeProduct => {
        assert.hasAllKeys(fakeProduct, ['id', 'price', 'inventory'], 'Contains the correct structure per database schema');
        assert.typeOf(fakeProduct.id, 'number', 'id property is a number');
        assert.typeOf(fakeProduct.price, 'number', 'price property is a number');
        assert.typeOf(fakeProduct.inventory, 'number', 'inventory property is a number');
      });
    });
  });

  beforeEach( async () => {
    await Mongoose.connect(Db);
    await Prinventory.db.dropDatabase();
  });

  describe('Populating database with fake data', () => {

    it('should respond to a query', async () => {
      await DbSeed();
      await Mongoose.connect(Db);
      let queryResult =  await Prinventory.find();
      // Mongoose.connection.close();
      assert.typeOf(queryResult, 'array', 'queryResult result is an array');
      assert.lengthOf(queryResult, 100);
      queryResult.forEach(fakeProduct => {
        assert.containsAllKeys(fakeProduct, ["id", "price", "inventory"], 'Contains all relevant keys');
        assert.typeOf(fakeProduct.id, 'number', 'id property is a number');
        assert.typeOf(fakeProduct.price, 'number', 'price property is a number');
        assert.typeOf(fakeProduct.inventory, 'number', 'inventory property is a number');
      });
    });
  });


});