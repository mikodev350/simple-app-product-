
const mongoose = require('mongoose');
const catchAsync=require('./../apiUtile/catchAsync');
const APIFeatures = require('./../apiUtile/apiFeatures');
const Stock =require('./../Schema/ProductSchema');
const History =require('./../Schema/HistorySchema');
const AppError=require('./../apiUtile/appError');
//const  Userdb = require('../Schema/model');
// const fs = require('fs');


/******************************************************************** */
// function loadJSON(filename = ''){
//   return JSON.parse(
//       fs.existsSync(filename)?
//       fs.readFileSync(filename).toString() 
//       :'""'
//   )
// }
/********************************************************************/
// function saveJSON(filename = '' , json= '""' ){
//   return( 
//     fs.writeFileSync(filename,JSON.stringify(json,null, 2))
//   )
// }
/********************************************************************/
    //   fs.writeFile(filename,JSON.stringify(json,null, 2),
    //   err => {
    //     if (err) {
    //         console.log('Error writing file', err)
    //     } else {
    //         console.log('Successfully wrote file')
    //     }
    // })

    /********************************************************************/


// create and save new user
exports.create = catchAsync(async (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
 let { nomProduit,Quantite,PrixAchat,PrixVente } =  req.body ;
 try {
          nomProduit=nomProduit.trim()
         const ProduitTrouver = await Stock.findOne({ nomProduit });
        const Produit= new Stock({
            nomProduit,
            Quantite,
            PrixAchat,
            PrixVente 
          })
        if (ProduitTrouver) {
            return res
              .status(400)
              .json({ errors: { msg: "Le Produit existe deja !!!"}});
            
            }
           await Produit.save()
          res.status(201).json({
            status: 'success',
            data: {
              Prod: Produit
            }
          });
          // res.redirect('/');
        } catch (err) {
          res.status(400).json({
            status: 'fail',
            message: err
          });
}
})
    /********************************************************************/

  //Recuperer les donner du Produit 
  exports.getAllProducts = catchAsync(async (req, res, next) => {
    //recupere un element
    if(req.query.id){
      const data  = await Stock.findById(req.query.id);
      if (!data) {
        return next(new AppError('No tour found with that ID', 404));
      }
      res.status(200).json(data);
    }else{
      //recupere tous
    const features = new APIFeatures(Stock.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const produit = await features.query;
  
    // SEND RESPONSE
    res.status(200).json(produit);
    }
  });

  //Delete Product
  exports.deleteOneProduits = (req, res)=>{
    const id = req.params.id;

    Stock.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.status(200).json({
                    message : "User was deleted successfully!"
                })
                //res.render('Produit');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}



//Update Element 

exports.update = catchAsync(async (req, res, next) => {
  const data = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!data) {
    return next(new AppError('No product found with that ID', 404));
  }
  res.status(200).json(data);
  // res.render('reparation');
  // res.redirect('/api/reparation');

});

/*************************************************************************** */

//Quantiter of data 
exports.QuantiterVendu = catchAsync(async (req, res, next) => {
  const { id, quantiterVenter} =req.body;
  let Product = await Stock.findById(id);

  if(quantiterVenter > Product.Quantite){
    res.status(500).send({
      message: "le chiffre ne doit pas etre grand "
  });
  }

  Product.Quantite=Product.Quantite - quantiterVenter;
  var Gain=(Product.PrixVente - Product.PrixAchat)*quantiterVenter;
  // const historiqueProduct={
  //   name:'',
  //   Produit:Product.nomProduit,
  //   type:'Achat',
  //   Gain: Gain,
  //   Date:date
  // }

  const history= new History({
    name:'',
    nomProduit:Product.nomProduit,
    type:'Achat',
    Gain: Gain,
  })
  
  await history.save();
  await Product.save();

  res.status(200).json(Product);

})


  /********************************************************************/

  //Recuperer les donner du Produit 
  exports.getAllProductsZero = catchAsync(async (req, res, next) => {
    //recupere un element
      const data  = await Stock.find({ Quantite:0});
      if (!data) {
        return next(new AppError('No tour found', 404));
      }
      res.status(200).json(data);
  });

  // //Update Product 
  // exports.UpdateProduct=Stock=>catchAsync(async (req, res, next) => {
  //   let Produit = await Stock.findOne({ nomProduit:'Galax s4' });
  //   docProduct
  //   // const = Stock.findOneAndUpdate( {
  //   //   new: true,
  //   //   runValidators: true
  //   // },)
  // })



  // exports.createProduct = catchAsync(async (req, res) => {
//   let { nomProduit,Quantite,PrixAchat,PrixVente } =  req.body ;
//     try {
//       nomProduit=nomProduit.trim()
//       //const nomProduit=nom
//       //console.log(" le mots : "+nomProduit+"espacer");
//       let Produit = await Stock.findOne({ nomProduit });
//       if (Produit) {
//         return res
//           .status(400)
//           .json({ errors: { msg: "Le Produit existe deja !!!"}});
//       }
//        Produit= new Stock({
//         nomProduit,
//         Quantite,
//         PrixAchat,
//         PrixVente 
//       })
//       await Produit.save()
//       res.status(201).json({
//         status: 'success',
//         data: {
//           Prod: Produit
//         }
//       });
//     } catch (err) {
//       res.status(400).json({
//         status: 'fail',
//         message: err
//       });
//     }
//   });
