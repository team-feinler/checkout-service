const { username, password, port } = require('./config.js');
const nano = require('nano')(`http://${username}:${password}@localhost:${port}`);

const createAndConnectToDatabase = async () => {
  try {
    const response = await nano.db.create('prinventory')
    // succeeded
    console.log('Successfully created database!', response);
  } catch (e) {
    // failed
    console.error('Error creating database!', e);
  }
};

createAndConnectToDatabase();