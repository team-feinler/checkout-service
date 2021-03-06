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

const createNewRecord = async (recordObject) => {
  try{
    let savedRecord = await Prinventory.create(recordObject);
  } catch (error) {
    console.log('ERROR IN CREATING A RECORD: ', error);
  }
};

const removeOneRecord = async (productIdNumberToDelete) => {
  try {
    await Prinventory.deleteOne({id: productIdNumberToDelete})
  } catch (error) {
    console.log('ERROR IN REMOVING RECORD: ', err)
  }
};

//update a record
const updateOneRecord = async (productIdObjectToUpdate) => {
  try{
    let updatedRecord = await Prinventory.findOneAndUpdate({id: productIdObjectToUpdate.id}, productIdObjectToUpdate, {new: true, overwrite: true});
    return updatedRecord;
  } catch (error) {
    console.log('ERROR IN UPDATE in db query: ', error)
  }
}


module.exports = {
  getProductPriceAndInventoryCount: getProductPriceAndInventoryCount,
  getMultipleProductsPriceAndInventoryCount: getMultipleProductsPriceAndInventoryCount,
  removeOneRecord: removeOneRecord,
  createNewRecord: createNewRecord,
  updateOneRecord: updateOneRecord,
};