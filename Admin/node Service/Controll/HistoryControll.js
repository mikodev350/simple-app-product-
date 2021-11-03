const fs = require('fs');
const catchAsync=require('./../apiUtile/catchAsync');
const APIFeatures = require('./../apiUtile/apiFeatures');
const History =require('./../Schema/HistorySchema');
const { log } = require('console');



exports.getAllhistory = catchAsync(async (req, res, next) => {
    //recupere un element
    if(req.query.id){
        const data  = await History.findById(req.query.id);
        if (!data) {
          return next(new AppError('No tour found with that ID', 404));
        }
  
        res.status(200).json(data);
      }else{
        //recupere tous
      const features = new APIFeatures(History.find(), req.query)
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
})
/**************************************************************************88 */

  //Delete Product
  exports.deleteOneHistory = (req, res)=>{
    const id = req.params.id;
    History.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.status(200).json({
                    message : "deleted successfully!"
                })
                //res.render('Produit');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete with id=" + id
            });
        });
}


// /******************************************************************** */
// function loadJSON(filename = ''){
//     console.log(filename);
//     return JSON.parse(
//         fs.existsSync(filename)?
//         fs.readFileSync(filename).toString() 
//         :'""'
//     )
// }
// /********************************************************************/
// function saveJSON(filename = '' , json= '""' ){
//     return( 
//         fs.writeFileSync(filename
//             ,
//             JSON.stringify(json
//                            ,null, 2))
//     )
// }
// /********************************************************************/

// // create and save new user
// exports.MetreHistory = catchAsync(async (req, res) => {
//  const {name,age,gender,department ,car}=req.body
 
// let student = { 
//     name: name,
//     age: age, 
//     gender: gender,
//     department: department,
//     car: car 
// };
// var data;

// data = loadJSON('./public/data/history.json');

// console.log(data);
// data.push(student)

// saveJSON('./public/data/history.json',data)

// res.status(201).json({
//     data
//   });
// })






