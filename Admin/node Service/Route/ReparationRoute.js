const express = require('express');
const route = express.Router();
const render=require('./../service/renderReparations');
const reparationControll=require('./../Controll/RepartionControll');

/*********************************************************/
/***************** API *******************/
 route.post('/api/reparation',reparationControll.createReparation);
 route.get('/api/AllReparation',reparationControll.getAlReparation);
 route.post('/api/updateReparation/:id', reparationControll.updateReparation);
 route.delete('/api/updateReparation/:id', reparationControll.deleteOneReparations);

 /*********************************************************/
route.get('/', render.pageNewReparation);
route.get('/form', render.pageFomReparation);
route.get('/update_reparation', render.update_reparation);

 
module.exports = route
