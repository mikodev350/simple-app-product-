const mongoose = require('mongoose');

const ReparationSchema=new mongoose.Schema({
    name: {
        type: String,
        required : true
      },
      PrixAchat:{
        type: Number,
        required : true
              },
      PrixVente:{
        type: Number,
        },
    PrixReparation:{
        type: Number,
        }
            
})

const Reparation = mongoose.model('Reparation', ReparationSchema);

module.exports = Reparation;