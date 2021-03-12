const { Sequelize } = require('sequelize');
const { postgres } = require('./config.js');

const establishConnection = async () => {
  const connection = await new Sequelize(postgres.database, postgres.user, postgres.password, {
    host: postgres.host,
    dialect: 'postgres',
    logging: false
  });
  console.log('CONNECTION ESTABLISHED');
  return connection;
};

const testConnection = async (connection) => {
  try {
    await connection.authenticate();
    console.log('CONNECTION AUTHENTICATED');
  } catch (error) {
    console.log('ERROR IN CONNECTION: ', error);
  }
};

const closeConnection = async (connection) => {
  await connection.close();
  console.log('CONNECTION CLOSED');
};

module.exports = { establishConnection, testConnection, closeConnection };