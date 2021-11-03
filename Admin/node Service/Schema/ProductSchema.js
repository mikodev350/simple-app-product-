const mongoose = require('mongoose');


const ProductSchema=new mongoose.Schema({
      nomProduit: {
        type: String,
        required : true
      },
      Quantite:{
                type: Number,
                required : true
      },
      PrixAchat:{
                type: Number,
                required : true
              },
      PrixVente:{
                type: Number,
                required : true
              },
      Credit: { type: Number, 
              default: '0' 
            }

});
const Stock = mongoose.model('Stock', ProductSchema);

module.exports = Stock;

// ,
//     PhotoProduit:{
//         type: String,
//       },
//    

