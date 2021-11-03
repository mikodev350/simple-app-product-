const mongoose = require('mongoose');
var userschema = new mongoose.Schema({
    name : {
        type : String,
    },
    Tel : {
        type: String,
    },
    nomDesProduit:[
        {
          type:String
        }
      ], 
      quantiter:[
        {
          type:Number
        }],
      prixdeVente:[
          {
            type:Number
          }
      ],
      credit:
        {
          type:Number,
        },
        date:[
          {        
            type: String,
          }
        ]
    })

const Userdb = mongoose.model('User', userschema);

module.exports = Userdb;