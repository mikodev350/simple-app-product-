const axios = require('axios');

// exports.pageHistory =(req, res, next)=>{
//     res.render('Historique');
//   };
  // getHistory

          // Recupere  data donner produit
          exports.pageHistory = (req, res) => {
            // Make a get request to /api/users
           axios.get('http://localhost:3000/api/v1/History/getHistory').then(function(response){
              res.render('Historique', { history : response.data });

           }).catch(err =>{
               res.send(err);
           })
     }