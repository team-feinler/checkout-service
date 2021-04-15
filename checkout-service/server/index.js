const nr = require('newrelic');
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

//Middlewares/setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));
app.use('/:id', express.static(__dirname + '/../public'));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

//routes
app.get('/priceandinventory/id/:productId', async (req, res) => {
  let { productId } = req.params;

  const productInfo = await getProductPriceAndInventoryCount(productId)

  if (!productInfo.length) {
      res.status(500).send('Invalid product id');
    } else {
      res.status(200).send(productInfo);
    }
});

app.post('/priceandinventory/id/multiple', (req, res) => {
  let productIds = req.body;
  if (productIds.length > 30 || productIds.length === 0 || !productIds) {
    res.status(500).end();
  } else {
    getMultipleProductsPriceAndInventoryCount(productIds)
    .then(productsInfo => res.status(200).send(productsInfo));
  }
});

app.post('/priceandinventory/id/createRecord', (req, res) => {
  let newRecord = req.body;
  createNewRecord(newRecord)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).end();
    })
});

app.put('/priceandinventory/id/updateRecord', (req, res) => {
  let recordToUpdate = req.body;
  updateOneRecord(recordToUpdate)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).end();
    })
});

app.delete('/priceandinventory/id/removeRecord/:productId', (req, res) => {
  let { productId } = req.params;
  removeOneRecord(productId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).end();
    })
});

app.listen(port, () => console.log(`listening on port ${port}`));


module.exports = app;