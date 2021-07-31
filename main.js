// --- Libraries importing
// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const DBQueries = require('./DB/DBQueries');
const reader = require('./FS/reader');
const cors = require('cors');

init();

async function init() {
  try {
    let table = await DBQueries.isTable();
    if (table[0].count == 0) {
      await DBQueries.createProductsTable();
      let rawdata = await reader.readFile();
      let products = JSON.parse(rawdata);
      // await DBQueries.insertProduct(products[0]);
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        await DBQueries.insertProduct(product);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
// --- Routes importing
const products = require('./routes/products.js');

// --- App settings and config
const app = express(); // web application framework
var port = process.env.PORT || '3001';
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(morgan(':method :url :status   :response-time ms')); //logger

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.get('/alive', (req, res) => {
  res.send('I am alive');
});

//Routing
app.use(products);

//Default router
app.use((req, res) => {
  res.sendStatus(404); //not found
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

process.on('SIGINT', function () {
  if (server) {
    server.close(() => console.log('server closed'));
  }
  process.exit();
});

module.exports = app;

// tedious_host = localhost
//   tedious_user = root
//   tedious_password = 12345678
//   tedious_database = test
