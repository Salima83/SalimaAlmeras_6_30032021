const express = require('express');
const bodyParser = require('body-parser');

 

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});
app.use('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: '',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: '',
      price: 4,
      userId: '',
    },
    {
      _id: '',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: '',
      price: 2900,
      userId: '',
    },
  ];
  res.status(200).json(stuff);
});


const mongoose = require('mongoose');

 mongoose.connect('mongodb+srv://Salima83:<Elienarbonne201814>@cluster0.4jcmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
module.exports = app;
