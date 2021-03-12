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
  productNumber: {
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

//sync all models function
const syncModels = async () => {
  await sequelize.sync({ force: true });
  console.log('All models were synchronized successfully!');
};

export.defaults = { syncModels };