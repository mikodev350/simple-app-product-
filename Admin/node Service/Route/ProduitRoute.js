const express = require('express');
const route = express.Router();
const render=require('./../service/renderProduct');
const ProductControll=require('./../Controll/ProductControll');

/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/', render.pageProduct);
 route.get('/create_newproduct', render.pageNewProduct);
 route.get('/update_product', render.update_product);
 route.get('/ZeroProduct', render.AlertProduct);
 


// API
route.post('/api/product/create', ProductControll.create);
route.get('/api/All_product', ProductControll.getAllProducts);
route.post('/api/updateProduct/:id', ProductControll.update);
route.delete('/api/All_product/:id', ProductControll.deleteOneProduits);
route.post('/api/quantiter', ProductControll.QuantiterVendu);
route.get('/api/All_product_Zero', ProductControll.getAllProductsZero);


module.exports = route
