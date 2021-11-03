const express = require('express');

const route = express.Router();

const render=require('./../service/renderAuth');
const authController=require('./../Controll/authController');


route.get('/', render.Login);
route.get('/Settings', render.ChangePassword);
route.get('/RecuperationCompte',render.RecuperationCompte);
route.get('/UpdateChange',render.UpdateChangePassword);


route.get('/getQuestion/:id', authController.getQuestion);
route.post('/register', authController.signup);
route.post('/login', authController.login);
route.post('/Question', authController.QuestionPassword);
route.post('/ChangePassword',authController.ChangePasswrod);
route.post('/New_Password',authController.ChangePasswrodAfterForgot);
route.post('/ConfirmEmail',authController.ConfirmEmail);



module.exports = route
