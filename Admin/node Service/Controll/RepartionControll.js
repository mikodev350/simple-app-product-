const mongoose = require('mongoose');
const catchAsync=require('./../apiUtile/catchAsync');
const APIFeatures = require('./../apiUtile/apiFeatures');
const Reparation =require('./../Schema/ReparationSchemat');
const History =require('./../Schema/HistorySchema');



// create and save new user
exports.createReparation = catchAsync(async (req, res) => {
  var type;
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    let {name,PrixAchat,PrixVente,PrixReparation } =  req.body ;
    try {
      const ReparationData= new Reparation({
            name,
            PrixAchat,
            PrixVente,
            PrixReparation 
        })
        var Gain;
        // if(PrixReparation === '0'){
          type='Reparation'
          Gain = (Number(PrixVente) - Number(PrixAchat)) +Number(PrixReparation)
        // }else{
        //   Gain=Number(PrixReparation);
        //   console.log(Gain);
        // }
        const history= new History({
          name:'',
          nomProduit:name,
          type: type,
          Gain: Gain,
          idRef:ReparationData._id,
        })

        await history.save();
        await ReparationData.save()

        res.status(201).json({
          status: 'success',
          data: {
            Reparation: ReparationData
          }
        });
      } catch (err) {
        res.status(400).json({
          status: 'fail',
          message: err
        });
    }
})



exports.getAlReparation = catchAsync(async (req, res, next) => {
   //Recuperer les donner du Produit 
    //recupere un element
    if(req.query.id){
      const data  = await Reparation.findById(req.query.id);
      if (!data) {
        return next(new AppError('No tour found with that ID', 404));
      }
      res.status(200).json(data);
    }else{
      //recupere tous
    const features = new APIFeatures(Reparation.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const reparation = await features.query;
  
    // SEND RESPONSE
    res.status(200).json(reparation);
    }
})

/**************************************************************************** */
         /**************Update Element  ************/
exports.updateReparation = catchAsync(async (req, res, next) => {
  const data = await Reparation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  const ReparationHistory = await History.findOne({ idRef:data._id});
  ReparationHistory.Gain = (Number(data.PrixVente) - Number(data.PrixAchat)) + Number(data.PrixReparation)
  ReparationHistory.nomProduit=data.name;
  ReparationHistory.save()

  if (!data) {
    return next(new AppError('No product found with that ID', 404));
  }
console.log(data);
  res.status(200).json(data);
});

/***************************************************************************** */
                       /**************DELETE ************/
exports.deleteOneReparations = (req, res)=>{
  const id = req.params.id;
  Reparation.findByIdAndDelete(id)
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