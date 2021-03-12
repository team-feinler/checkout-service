const { Sequelize, DataTypes } = require('sequelize');
const { establishConnection, testConnection, closeConnection } = require('./postgresConnection.js');

const sequelize = establishConnection();

//single table schema
const prinventory = sequelize.define('prinventory', {
  productNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

//sync all models function
const syncModels = async () => {
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully!');
};

export.defaults = { syncModels };