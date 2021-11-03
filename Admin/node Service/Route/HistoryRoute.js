const express = require('express');
const route = express.Router();
const render=require('./../service/renderHiatory');
const HistoryControll=require('./../Controll/HistoryControll');

route.get('/', render.pageHistory);

route.get('/getHistory', HistoryControll.getAllhistory);
route.delete('/deleteHistory/:id', HistoryControll.deleteOneHistory);


module.exports = route
