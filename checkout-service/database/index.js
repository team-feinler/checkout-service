const Mongoose = require('mongoose');
const Db = 'mongodb://localhost/prinventory';
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

Mongoose.connect(Db, mongooseOptions, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to mongodb');
  }
});


const PrinventorySchema = Mongoose.Schema({
  id: {type: Number, unique: true},
  price: Number,
  inventory: Number,
});

const Prinventory = Mongoose.model('Prinventory', PrinventorySchema);

module.exports = Prinventory;