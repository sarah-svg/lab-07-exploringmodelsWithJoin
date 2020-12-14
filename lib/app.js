const express = require('express');
const Family = require('./models/Family');
const FamilyPet = require('./models/FamilyPets');
const app = express();

app.use(express.json());

//  endpoints for ONE CHILD
app.post('/api/v1/families', (req, res, next) => {
  Family
    .insert(req.body)
    .then(family => res.send(family))
    .catch(next);
});

app.get('/api/v1/families/:id', (req, res, next) => {
  Family
    .findById(req.params.id)
    .then(family => res.send(family))
    .catch(next);
});

app.get('/api/v1/families', (req, res, next) => {
  Family
    .find()
    .then(family => res.send(family))
    .catch(next);
});

app.put('/api/v1/families/:id', (req, res, next) => {
  Family
    .update(req.params.id, req.body)
    .then(family => res.send(family))
    .catch(next);
});

app.delete('/api/v1/families/:id', (req, res, next) => {
  Family
    .delete(req.params.id)
    .then(family => res.send(family))
    .catch(next);
});

//  endpoints for MANY TOYS
app.post('/api/v1/pets', (req, res, next) => {
  FamilyPet
    .insert(req.body)
    .then(pet => res.send(pet))
    .catch(next);
});

app.get('/api/v1/pets/:id', (req, res, next) => {
  FamilyPet
    .findById(req.params.id)
    .then(pet => res.send(pet))
    .catch(next);
});

app.get('/api/v1/pets', (req, res, next) => {
  FamilyPet
    .find()
    .then(pet => res.send(pet))
    .catch(next);
});

app.put('/api/v1/pets/:id', (req, res, next) => {
  FamilyPet
    .update(req.params.id, req.body)
    .then(pet => res.send(pet))
    .catch(next);
});

app.delete('/api/v1/pets/:id', (req, res, next) => {
  FamilyPet
    .delete(req.params.id)
    .then(pet => res.send(pet))
    .catch(next);
});

module.exports = app;
