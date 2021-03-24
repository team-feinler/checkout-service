const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4003;
const app = express();
// const dbQuery = require('../database/query.js'); // <-- mongoDB query functions
const { getProductPriceAndInventoryCount } = require('../database/postgres/postgresModel.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../public'));
app.use('/:id', express.static(__dirname + '/../public'));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};


app.get('/priceandinventory/id/:productId', (req, res) => {
  let productId = req.params.productId;
  // dbQuery.getProductPriceAndInventoryCount(productId) // <-- mongoDB query
  getProductPriceAndInventoryCount(productId)
  .then((productInfo) => {
    if (!productInfo.length) {
      res.status(404).send('Invalid product id');
    } else {
      res.status(200).send(productInfo);
    }
  });
});

app.post('/priceandinventory/id/multiple', (req, res) => {
  let productIds = req.body;
  if (productIds.length > 30 || productIds.length === 0 || !productIds) {
    res.status(400).end();
  } else {
    dbQuery.getMultipleProductsPriceAndInventoryCount(productIds)
    .then(productsInfo => res.status(200).send(productsInfo));
  }
});

app.post('/priceandinventory/id/createRecord', (req, res) => {
  let newRecord = req.body;
  dbQuery.createNewRecord(newRecord)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('ERROR SAVING RECORD in server: ', error);
      res.status(400).end();
    })
})

app.put('/priceandinventory/id/updateRecord', (req, res) => {
  let recordToUpdate = req.body;
  dbQuery.updateOneRecord(recordToUpdate)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.log('FAILED TO UPDATE in server: ', error);
      res.status(400).end();
    })
})

app.delete('/priceandinventory/id/removeRecord/:productId', (req, res) => {
  let { productId } = req.params;
  dbQuery.removeOneRecord(productId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('FAILED DELETING RECORD IN SERVER', err);
      res.status(400).end();
    })
})

app.listen(port, () => console.log(`listening on port ${port}`));


module.exports = app;