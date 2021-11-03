// For Client 
const express = require('express');
const route = express.Router();
const render=require('./../service/renderClient');
const ProductControll=require('./../Controll/ProductControll');
const ClientControll=require('./../Controll/ClientConttroll');

route.get('/ClientsElement', render.pageClient);
route.get('/create_newClient', render.pageNewClient);




route.get('/api/All_product', ProductControll.getAllProducts);

//post methode 
route.post('/api/clientCredit', ClientControll.addClient);

route.get('/api/AllclientCredits', ClientControll.getAllClients);
route.delete('/api/AllclientCredits/:id', ClientControll.deleteOneClient);

//versement
route.post('/api/AllclientCredits/:id', ClientControll.VersementClient);



//route.get('/create_newClient', render.pageNewClient);

module.exports = route
