

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


app.get('/api/v1/flower/:id', (req, res, next) => {
  Flower 

    .findById(req.params.id)
    .then(flower => res.send(flower))
    .catch(next);
  console.log('hi2');

});  

app.get('/api/v1/flower', (req, res, next) => {
  Flower
    .find()
    .then(flower => res.send(flower))
    .catch(next);
});

module.exports = app;


