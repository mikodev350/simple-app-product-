const axios = require('axios');
// LES PAGE DE APP  TEST 
// exports.pageProduct =(req, res, next)=>{
//     res.render('Produit');
//   };
  
  exports.pageNewProduct =(req, res, next)=>{
    res.render('index');
  };
  
// Recupere  data donner produit
exports.pageProduct = (req, res) => {
  // Make a get request to /api/users
  axios.get('http://localhost:3000/api/v1/Product/api/All_product')
      .then(function(response){
        res.render('Produit', { stocks : response.data });
      })
      .catch(err =>{
          res.send(err);
      })
    }

    //Update element id 
    exports.update_product = (req, res) =>{
      axios.get('http://localhost:3000/api/v1/Product/api/All_product/', { params : { id : req.query.id }})
          .then(function(productdata){
            console.log(productdata.data);
              res.render("update_product", { stock : productdata.data})
          })
          .catch(err =>{
              res.send(err);
          })
  }



     //Update element id 
     exports.AlertProduct = (req, res) =>{
      axios.get('http://localhost:3000/api/v1/Product/api/All_product_Zero')
          .then(function(response){
              res.render("AlertProduct" , { ZeroProduct : response.data })
          })
          .catch(err =>{
              res.send(err);
          })
  }