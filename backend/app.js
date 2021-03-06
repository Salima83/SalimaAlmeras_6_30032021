const express = require('express');
const rateLimit = require("express-rate-limit");

const mongoose = require('mongoose');
const path = require('path');

const helmet = require("helmet");
require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes =require('./routes/user');

 mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
///
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP a 100 requete par windowMs
  handler: function (req, res,) {
    return res.status(429).json({
      error: 'Vous avez envoyé trop de requetes, merci de patienter'
    })
}

});
 

const app = express();

app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces',sauceRoutes);
app.use('/api/auth' , userRoutes);

module.exports = app;
