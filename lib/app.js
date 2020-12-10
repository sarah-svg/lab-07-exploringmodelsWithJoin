

require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const Flower = require('./model/Flower');
const Weather = require('./model/Weather');

app.post('/api/v1/flower', (req, res, next) => {

  Flower
    .insert(req.body)
    .then(flower => res.send(flower))
    .catch(next);

});

//////////////gets, post, put, deletes flowers
app.get('/api/v1/flower/:id', (req, res, next) => {
  Flower 

    .findById(req.params.id)
    .then(flower => res.send(flower))
    .catch(next);


});  

app.get('/api/v1/flower', (req, res, next) => {
  Flower
    .find()
    .then(flower => res.send(flower))
    .catch(next);
});
app.put('/api/v1/flower/:id', (req, res, next) => {
  Flower
    .update(req.params.id, req.body)
    .then(flower => res.send(flower))
    .catch(next);
  
});

app.delete('/api/v1/flower/:id', (req, res, next) => {
  Flower
    .delete(req.params.id)
    .then(flower => res.send(flower))
    .catch(next);  

});
////////////////////////////////////post, get, update, put weather

app.post('/api/v1/weather', (req, res, next) => {

  Weather
    .insert(req.body)
    .then(weather => res.send(weather))
    .catch(next);
  console.log('hi');
});

app.get('/api/v1/weather', (req, res, next) => {
  Weather
    .find()
    .then(weather => res.send(weather))
    .catch(next);
  console.log('hi1');
});
app.get('/api/v1/weather/:id', (req, res, next) => {
  Weather 
  
    .findById(req.params.id)
    .then(weather => res.send(weather))
    .catch(next);
  
  
});  
app.put('/api/v1/weather/:id', (req, res, next) => {
  Weather
    .update(req.params.id, req.body)
    .then(weather => res.send(weather))
    .catch(next);
    
});
  
app.delete('/api/v1/weather/:id', (req, res, next) => {
  Weather
    .delete(req.params.id)
    .then(weather => res.send(weather))
    .catch(next);  
  
});


module.exports = app;


