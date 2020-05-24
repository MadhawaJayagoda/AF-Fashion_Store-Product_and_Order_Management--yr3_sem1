const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//db connection
const db = require('./utils/db_connection');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Import Routes
const orderRoute = require('./controllers/orderController');
const productRouter = require('./controllers/productController');

//Routes
app.use('/order', orderRoute);
app.use('/product', productRouter);

//start listening to the server
app.listen( process.env.PORT, () =>{
    console.log("Server up and running on port : " + process.env.PORT );
});
