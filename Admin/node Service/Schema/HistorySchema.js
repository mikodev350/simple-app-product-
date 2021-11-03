  const mongoose = require('mongoose');

const HistorySchema=new mongoose.Schema({
      name: {
        type: String,
      },
       nomProduit: [{
        type: String,
       }],
      type: {
        type: String,
      },
      Gain:{
        type: Number,
        required : true
      },   
      idRef:{
        type: String,
       },
   
      date: {
        type: Date,
        default: Date.now
      }



});
const History = mongoose.model('History', HistorySchema);

module.exports = History;


