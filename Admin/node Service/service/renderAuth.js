const axios = require('axios');
  
  exports.Login =(req, res, next)=>{
    res.render('Login');
  };
  exports.RecuperationCompte =(req, res, next)=>{
    res.render('Recuperation');
  };
  exports.UpdateChangePassword =(req, res, next)=>{
    res.render('UpdatePassword');
  };
  
  exports.ChangePassword =(req, res, next)=>{
    axios.get('http://localhost:3000/getQuestion/61100342a0dca93d30026e89')
    .then(function(response){
      if(response.data){
        res.render('SettingsUpdate', { data : response.data });
      }else{
        res.render('Settings');
      }
    })
    .catch(err =>{
        res.send(err);
    })
  };