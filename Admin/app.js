const express = require('express');
const morgan = require('morgan');
const helmet=require('helmet')// Connect data
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
const ejs = require('ejs')


ProduitRoute=require("./node Service/Route/ProduitRoute");
ClientRoute=require("./node Service/Route/ClientRoute");
ReparationRoute=require("./node Service/Route/ReparationRoute");
HistoryRoute=require("./node Service/Route/HistoryRoute");
AuthRoute=require("./node Service/Route/AuthRoute");


var path = require('path');


const app=express();

dotenv.config({ path: './config.env' });



const DB = process.env.DATABASE;



//view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname+"/public")));


    app.use(morgan('dev'));


/********************************************************************************/

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

/********************************************************************************/

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(`http://localhost:${port}/`);
});
/************************************************************************** */
// parse request to body-parser
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());


app.use('/',AuthRoute);
app.use('/api/v1/Product',ProduitRoute);
app.use('/api/v1/client',ClientRoute);
app.use('/api/v1/reparation',ReparationRoute);
app.use('/api/v1/History',HistoryRoute);



module.exports = app;
