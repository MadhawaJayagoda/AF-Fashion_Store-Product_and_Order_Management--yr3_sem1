const mongoose = require('mongoose');
require('dotenv').config();

const db_connection = mongoose.connect(process.env.DATABASE_URL,   { useNewUrlParser: true, useUnifiedTopology: true  } ,function(err){
                    if(err){
                        console.log("Error occured while connecting ot the Database ...!");
                        throw err;
                    }
                    console.log("MongoDB : Connected to the Database successfully ...!");
                });

module.exports = db_connection;