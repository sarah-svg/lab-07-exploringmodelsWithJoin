

require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const Flower = require('./model/Flower');

app.post('/api/v1/flower', (req, res, next) => {
 
  Flower
    .insert(req.body)
    .then(flower => res.send(flower))
    .catch(next);
  console.log('hi');
});



module.exports = app;


