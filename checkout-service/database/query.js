const mongoose = require('mongoose');
const Prinventory = require('./index.js');

const getProductPriceAndInventoryCount = async (id) => {
  let productPriceAndInventoryCount = await Prinventory.find({id: id}, {"_id": false}).select('id price inventory');
  return productPriceAndInventoryCount;
};

const getMultipleProductsPriceAndInventoryCount = async (ids) => {
  let productPricesAndInventoryCounts = await Prinventory.find({id: {$in: ids}}, {"_id": false}).select('id price inventory');
  return productPricesAndInventoryCounts;
};

const removeOneRecord = async (productIdNumberToDelete) => {
  try {
    await Prinventory.deleteOne({id: productIdNumberToDelete})
    console.log('SUCCESSFULLY REMOVED RECORD FROM DATABASE')
  } catch (err) {
    console.log('ERROR IN REMOVING RECORD: ', err)
  }
};


module.exports = {
  getProductPriceAndInventoryCount: getProductPriceAndInventoryCount,
  getMultipleProductsPriceAndInventoryCount: getMultipleProductsPriceAndInventoryCount,
  removeOneRecord: removeOneRecord,
};