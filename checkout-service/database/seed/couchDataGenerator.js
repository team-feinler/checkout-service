const Faker = require('faker');

const fakePrice = () => Faker.finance.amount(1, 500, 2);

const fakeInventory = () => Faker.random.number({min: 0, max: 100});

const CreateFakeCouchData = (desiredNumberOfRecords, startingId) => {

  let productsToSave = []

  for (let i = 0; i < desiredNumberOfRecords; i++) {
    let productId = i + startingId;
    let item = {
      id: productId,
      price: fakePrice(),
      inventory: fakeInventory()
    };
    productsToSave.push(item);
  };

  return productsToSave;
};

module.exports = CreateFakeCouchData;