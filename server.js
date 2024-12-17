require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const server = express(); //var server uses all the express function
const port = process.env.PORT || 3000; //port
const DB = process.env.MONGODB_ATLAS;  //database link
const cryptoHelper = require('./utils/cryptoHelper.js'); 

//connect to mongo database
mongoose.connect(DB)
    .then(() => console.log("Successfully connected to database!!"))
    .catch((err) => { console.log(err) });


//we require app.js as it handles all the routes
const app = require('./app');

//app is a middleware fn which is included here i.e. it is used in server but the code is defined else where but we use it here
server.use(app);


//the server is started on the given port
server.listen(port, () => console.log("The server is listening on port: ", port, '....'));

var json = {"email":"abhi@gmail.com","expireOn":Date.now() + 4*60*60*1000};

const encryptedData = cryptoHelper.encryptData(json);
console.log({encryptedData});
const decryptedData = cryptoHelper.decryptData(encryptedData);
console.log({decryptedData});
