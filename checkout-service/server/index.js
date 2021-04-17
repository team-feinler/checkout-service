//const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4003;
const app = express();
const {
  getProductPriceAndInventoryCount,
  getMultipleProductsPriceAndInventoryCount,
  removeOneRecord,
  updateOneRecord,
  createNewRecord
} = require('../database/postgres/postgresModel.js');
const { setToRedisCache, getFromRedisCache } = require('./redis.js');

//Middlewares/setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));
app.use('/:id', express.static(__dirname + '/../public'));

// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// };

//routes
app.get('/priceandinventory/id/:productId', getFromRedisCache, async (req, res) => {
  let { productId } = req.params;
  const productInfo = await getProductPriceAndInventoryCount(productId);
  setToRedisCache(productId, 3600, JSON.stringify(productInfo));

  if (!productInfo.length) {
      res.status(500).send('Invalid product id');
    } else {
      res.status(200).send(productInfo);
    }
});

app.post('/priceandinventory/id/multiple', async (req, res) => {
  let productIds = req.body;
  if (productIds.length > 30 || productIds.length === 0 || !productIds) {
    res.status(500).end();
  } else {
    try {
      const productInfo = await getMultipleProductsPriceAndInventoryCount(productIds)
      res.status(200).send(productsInfo);
    } catch (e) {
      res.status(500);
    }
  }
});

app.post('/priceandinventory/id/createRecord', async (req, res) => {
  let newRecord = req.body;
  try {
    await createNewRecord(newRecord)
    res.sendStatus(200);
  } catch (error) {
    res.status(500).end();
  }
});

app.put('/priceandinventory/id/updateRecord', async (req, res) => {
  let recordToUpdate = req.body;
  try {
    const result = await updateOneRecord(recordToUpdate);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).end();
  }
});

app.delete('/priceandinventory/id/removeRecord/:productId', async (req, res) => {
  let { productId } = req.params;
  try {
    await removeOneRecord(productId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).end();
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));


module.exports = app;