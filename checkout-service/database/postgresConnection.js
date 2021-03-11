const { Sequelize } = require('sequelize');
const { postgres } = require('./config.js');

const sequelize = new Sequelize(postgres.database, postgres.user, postgres.password, {
  host: postgres.host,
  dialect: 'postgres',
  logging: false
});

const authentication = async () => {
  try {
    await sequelize.authenticate();
    console.log('CONNECTION ESTABLISHED');
  } catch (error) {
    console.log('ERROR IN CONNECTION: ', error);
  }
}