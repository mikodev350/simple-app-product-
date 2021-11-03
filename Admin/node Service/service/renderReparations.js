const axios = require('axios');


  exports.pageNewReparation =(req, res, next)=>{
     // Make a get request to /api/users
  axios.get('http://localhost:3000/api/v1/reparation/api/AllReparation/')
  .then(function(response){
    res.render('reparation', { reparation : response.data });
  })
  .catch(err =>{
      res.send(err);
  })
  };

  exports.pageFomReparation =(req, res, next)=>{
    res.render('newReparation');
  };

      //Update element id 
      exports.update_reparation = (req, res) =>{
        axios.get('http://localhost:3000/api/v1/reparation/api/AllReparation/', { params : { id : req.query.id }})
            .then(function(productdata){
                res.render('update_Reparation', { piece : productdata.data})
            })
            .catch(err =>{
                res.send(err);
            })
    }
  


  
  