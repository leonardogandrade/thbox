const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const requireDir = require('require-dir');
const fileSystem = require('./fileSystem.json');
dotenv.config();
const app = express()

try{
    mongoose.set('userFIndAndModify',false);
    mongoose.connect(process.env.MONGOOSE,{useNewUrlParser : true, useFindAndModify: false});
}catch(err){
    console.log(`Error while mongoose connection - ${err}`)
}

//Models
requireDir('./src/models');

app.use(cors());
app.use(express.json())

app.use('/files',express.static(path.resolve(fileSystem.resized)));
app.use('/media',express.static(path.resolve(fileSystem.uploads)));

//Routes
app.use('/api',require('./src/routes'));
app.use('/login',require('./src/routes/authenticate'));

app.listen(process.env.PORT || 3002)