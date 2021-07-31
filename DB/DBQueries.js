const conn = require('./DBConnection');

// creating products table if not exsist
async function createProductsTable() {
  return new Promise((resolve, reject) => {
    conn.query(
      'CREATE TABLE IF NOT EXISTS `products` (' +
        `id` +
        ' VARCHAR(20) NOT NULL,' +
        `productName` +
        ' VARCHAR(100) NOT NULL,' +
        `unitManufacturingCost` +
        ' DOUBLE NOT NULL,' +
        `shipmentUnitCost` +
        ' DOUBLE NOT NULL,' +
        `monthlyAdvertismentCost` +
        ' DOUBLE NOT NULL,' +
        `manufacturingCountry` +
        ' VARCHAR(45),' +
        'PRIMARY KEY (`id`));',
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          console.log('products table successfuly created');
          return resolve('products table successfuly created');
        }
      }
    );
  });
}

// updating a prodcut cogs data
async function updateProduct(p) {
  return new Promise((resolve, reject) => {
    conn.query(
      'UPDATE products SET unitManufacturingCost = ?, shipmentUnitCost = ? , monthlyAdvertismentCost = ?' +
        ', manufacturingCountry = ? WHERE id = ?',
      [
        p.unitManufacturingCost,
        p.shipmentUnitCost,
        p.monthlyAdvertismentCost,
        p.manufacturingCountry,
        p.id,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          return resolve('product changed successfuly');
        }
      }
    );
  });
}

// inserting new product into products table
async function insertProduct(p) {
  return new Promise((resolve, reject) => {
    conn.query(
      'INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)',
      [
        p.id,
        p.productName,
        p.cogs.unitManufacturingCost,
        p.cogs.shipmentUnitCost,
        p.cogs.monthlyAdvertismentCost,
        p.cogs.manufacturingCountry,
      ],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          console.log('product successfuly inserted');
          return resolve('product successfuly inserted');
        }
      }
    );
  });
}

// getting all products
async function getProducts() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * from products', (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(results);
    });
  });
}

// return table products already exsist, otherwise return 0
async function isTable() {
  return new Promise((resolve, reject) => {
    conn.query(
      "SELECT COUNT(*) as 'count' FROM information_schema.tables " +
        "WHERE table_schema = 'bkditozzrjsi8hsuxr0v' AND table_name = 'products'",
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        // console.log(results);
        return resolve(results);
      }
    );
  });
}

// select product id
async function getProductId(id) {
  return new Promise((resolve, reject) => {
    conn.query('SELECT id from products where id = ?', [id], (err, results) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      // console.log(results);
      return resolve(results);
    });
  });
}

exports.getProductId = getProductId;
exports.isTable = isTable;
exports.getProducts = getProducts;
exports.createProductsTable = createProductsTable;
exports.updateProduct = updateProduct;
exports.insertProduct = insertProduct;
