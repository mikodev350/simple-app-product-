const axios = require('axios');

// exports.pageClient =(req, res, next)=>{
//     res.render('Clients');
//   };
  
  // exports.pageNewClient =(req, res, next)=>{
  //   res.render('newClient');
  // };

  // Recupere  data donner produit
    exports.pageNewClient = (req, res) => {
          // Make a get request to /api/users
        axios.get('http://localhost:3000/api/v1/Product/api/All_product').then(function(response){
          res.render('newClient', { stocks : response.data });
        }).catch(err =>{
            res.send(err);
        })
      }

        // Recupere  data donner produit
      exports.pageClient = (req, res) => {
             // Make a get request to /api/users
            axios.get('http://localhost:3000/api/v1/client/api/AllclientCredits').then(function(response){
               res.render('Clients', { clients : response.data });
            }).catch(err =>{
                res.send(err);
            })
      }