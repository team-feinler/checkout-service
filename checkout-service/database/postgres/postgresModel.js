const { Sequelize, DataTypes } = require('sequelize');
const { establishConnection, testConnection, closeConnection } = require('./postgresConnection.js');

const sequelize = establishConnection();

//single table schema
const prinventory = sequelize.define('prinventory', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

//controllers
const addMultipleRecords = async (arrayOfRecords) => {
  try {
    await prinventory.bulkCreate(arrayOfRecords);
  } catch (error) {
    console.log('Error inserting multiple records! ', error);
  }
};

const getProductPriceAndInventoryCount = async(incomingProductNumber) => {
  const recordToReturn = [];
  try {
    let { dataValues } = await prinventory.findOne({ where: { productId: incomingProductNumber } });
    recordToReturn.push(dataValues);
    return recordToReturn;
  } catch (e) {
    console.log('Could not retrieve requested product number: ', e);
    return recordToReturn;
  }
}

const getMultipleProductsPriceAndInventoryCount = async (ids) => {
  const recordsToReturn = [];
  try {
    let productPricesAndInventoryCounts = await prinventory.findAll({ where: { productId: ids } });
    recordsToReturn.push(productPricesAndInventoryCounts);
    return recordsToReturn;
  } catch (e) {
    console.log('Could not retrieve requested records: ', e);
    return recordsToReturn;
  }
};

const createNewRecord = async (recordObject) => {
  try{
    let savedRecord = await prinventory.create(recordObject);
  } catch (error) {
    console.log('ERROR IN CREATING A RECORD: ', error);
  }
};

const updateOneRecord = async (productIdObjectToUpdate) => {
  const options = {where: {productId: productIdObjectToUpdate.productId}, returning: true};
  try{
    let updatedRecord = await prinventory.update(productIdObjectToUpdate, options);
    return updatedRecord[1][0].dataValues;
  } catch (error) {
    console.log('ERROR IN UPDATE in db query: ', error)
  }
}

const removeOneRecord = async (productIdNumberToDelete) => {
  try {
    await prinventory.destroy({where: { productId: productIdNumberToDelete}})
  } catch (error) {
    console.log('ERROR IN REMOVING RECORD: ', err)
  }
};

//sync all models function
const syncModels = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully!');
  } catch (e) {
    console.log('Error syncing models: ', e);
  }
};


module.exports = {
  syncModels,
  addMultipleRecords,
  getProductPriceAndInventoryCount,
  getMultipleProductsPriceAndInventoryCount,
  removeOneRecord,
  updateOneRecord,
  createNewRecord
 };