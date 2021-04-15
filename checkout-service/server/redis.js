const redis = require('redis');

const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

//middleware functions to export and use in server/index.js
//set data to redis cache
const setToRedisCache = (productIdNumber, expiration, stringifiedValueFromDatabase) => {
  if (productIdNumber <= 10000000 && productIdNumber >= 9600000) {
    client.setex(productIdNumber, expiration, stringifiedValueFromDatabase)
  }
};

//get data from redis cache
const getFromRedisCache = (req, res, next) => {
  const { productId } = req.params;
  client.get(productId, (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};

module.exports = { setToRedisCache, getFromRedisCache };