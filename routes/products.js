const express = require('express');
const router = express.Router();
const axios = require('axios');
('use strict');
const fs = require('fs');
const path = require('path');
const DBQueries = require('../DB/DBQueries');

//--------------get all products----------------------------
router.get('/products', async (req, res, next) => {
  try {
    let products = await DBQueries.getProducts();
    products.forEach((p) => {
      if (p.manufacturingCountry == 'undefined') {
        p.manufacturingCountry = '';
      }
    });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

//--------------updating a prodcut cogs data----------------------------
router.post('/cogs', async (req, res, next) => {
  try {
    let product = req.body;
    if (product.id == undefined) {
      res.status(400).send({
        message: 'product id is missing',
        success: false,
      });
    } else {
      let id = await DBQueries.getProductId(product.id);
      if (id.length == 0) {
        res.status(400).send({
          message: 'product id is not available in DB',
          success: false,
        });
      } else {
        await DBQueries.updateProduct(product);
        res.status(201).send({
          message: 'product updated successfully',
          success: true,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
