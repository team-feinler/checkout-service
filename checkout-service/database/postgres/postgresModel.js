const { Sequelize, DataTypes } = require('sequelize');
const { establishConnection, testConnection, closeConnection } = require('./postgresConnection.js');

const sequelize = establishConnection();

//single table schema
const prinventory = sequelize.define('prinventory', {
  // uuid: {
  //   type: DataTypes.UUID,
  //   defaultValue: Sequelize.UUIDV4,
  //   primaryKey: true,
  //   allowNull: false,
  //   unique: true,
  // },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
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
    return arrayOfRecords.length;
  } catch (error) {
    console.log('Error inserting multiple records! ', error);
  }
};

const getProductPriceAndInventoryCount = async(incomingProductNumber) => {
  const recordToReturn = [];
  try {
    let { dataValues } = await prinventory.findOne({ where: { id: incomingProductNumber } });
    recordToReturn.push(dataValues);
    return recordToReturn;
  } catch (e) {
    console.log('Could not retrieve requested product number: ', e);
    return recordToReturn;
  }
}

//sync all models function
const syncModels = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully!');
  } catch (e) {
    console.log('Error syncing models: ', e);
  }
};


module.exports = { syncModels, addMultipleRecords, getProductPriceAndInventoryCount };