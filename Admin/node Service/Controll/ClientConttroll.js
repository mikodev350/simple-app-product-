const mongoose = require('mongoose');
const catchAsync=require('./../apiUtile/catchAsync');
const APIFeatures = require('./../apiUtile/apiFeatures');

const Stock =require('./../Schema/ProductSchema');
const  Userdb = require('../Schema/model');
const History =require('./../Schema/HistorySchema');

const AppError=require('./../apiUtile/appError');

exports.addClient=catchAsync(async(req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    try{
        let {name,numero,identify,total,PrixFinal,cantiter,SommeCredit,today,prixcredit}=req.body;


        
        /******************************************************************* */
        var updateStock=[];
        var nomProduct=[];
        var Qantiter=[];
        var prixdeVente=[];
        var prixdeAchat=[];

        var Aujourduih=[today];


        for (let i = 0; i < identify.length; i++) {
            updateStock[i]= await Stock.findById(identify[i]);
        }
/*************************************************************************** */
        for (let i = 0; i < updateStock.length; i++) {
            updateStock[i].Quantite=total[i]
            updateStock[i].Credit=PrixFinal[i];
            nomProduct[i]= updateStock[i].nomProduit;
            Qantiter[i]=updateStock[i].Quantite
            prixdeVente[i]=updateStock[i].PrixVente
            prixdeAchat[i]=updateStock[i].PrixAchat
            // credit[i]=updateStock[i].Credit
            // await  updateStock[i].save();
        }
        var Reste=[];
        var credit=[];
        var creditTotal=0;
        var gain=0;
        for (let i = 0; i < prixdeVente.length; i++) {
          Reste[i]=Number(cantiter[i]) * (Number(prixdeVente[i]) - Number(prixdeAchat[i]));
          credit[i]=Number(cantiter[i]) * (Number(prixdeVente[i])- Number(prixcredit[i]))
          creditTotal=Number(credit[i])+creditTotal;
          gain=gain+Number(Reste[i])
        }
        
        var Num;
        if(!numero){
          Num='No existe'
        }else{
          Num=numero
        }
          const Client= new Userdb({
            name : name,
            Tel : Num,
            nomDesProduit : nomProduct ,
            quantiter : cantiter ,
            prixdeVente : prixdeVente ,
            credit : creditTotal,
            date: Aujourduih
        })
        await Client.save()

        for (let i = 0; i < updateStock.length; i++) {
          await  updateStock[i].save();
          
        }
        const history=new History({
          name:name,
          nomProduit : nomProduct,
          type:'Achat',
          Gain: gain
        })
        await history.save();

            res.status(201).json({
            role: 'success',
            message:'Data Inserted Successfully '
          });
          
    } catch (err) {
        res.status(400).json({
          status: 'fail',
          message: err
        });
    }
})




 //Recuperer les donner du Produit 
 exports.getAllClients = catchAsync(async (req, res, next) => {
    //recupere un element
    if(req.query.id){
      const data  = await Userdb.findById(req.query.id);
      if (!data) {
        return next(new AppError('No tour found with that ID', 404));
      }

      res.status(200).json(data);
    }else{
      //recupere tous
    const features = new APIFeatures(Userdb.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
      let TabProfuct=[];
      let TabElement=[];
    let clients = await features.query;
    
    // SEND RESPONSE5432
    res.status(200).json(
      clients
    );
  }
  });



  // DELETE CLIENTS 
    //Delete Product
    exports.deleteOneClient = (req, res)=>{
      const id = req.params.id;
  
      Userdb.findByIdAndDelete(id)
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

  exports.VersementClient=catchAsync(async (req, res)=>{
      // recupere un element
    //   if(req.query.id){}
    let {id , versement}= req.body;
      let data  = await Userdb.findById(id);

      // let dataElement=data;
       versement=Number(versement);
       //console.log(typeof(versement));

          var credit=data.credit;
          data.credit=credit-versement;          
          if(data.credit<0){
            data.credit=0;
          }

          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = dd + '/' + mm + '/' + yyyy;

          data.date.unshift(today);

         await data.save()

         
           res.status(201).json({
               status: 'success',
                data
             });
  })