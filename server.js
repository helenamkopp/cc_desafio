const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cc_desafio_payment95', {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

requireDir('./src/models/');

app.use('/api', require('./src/routes'))

app.listen(3001);