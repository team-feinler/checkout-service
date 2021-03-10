const { username, password, port } = require('./config.js');
const nano = require('nano')(`http://${username}:${password}@localhost:${port}`);

const createAndConnectToDatabase = async () => {
  try {
    await nano.db.destroy('prinventory');
    await nano.db.create('prinventory');
    const prinventory = await nano.db.use('prinventory');
    // succeeded
    console.log('Successfully created and using database!');
  } catch (e) {
    // failed
    console.error('Error creating database!', e);
  }
};

createAndConnectToDatabase();