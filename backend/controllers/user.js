const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cryptoJS = require("crypto-js");
const selSecret = process.env.SEL;

const User = require('../models/User');
let passwordValidator = require('password-validator');
// Create a schema
let schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 20
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces

exports.signup = (req, res, next) => {
 if (!schema.validate(req.body.password)){
   res.status(400).json({message: 'mot de passe doit faire entre 8 et 20 caractere, doit contenir des lettres majuscules et miniscules deux chiffres ne doit pas avoir despace'})
 }else {

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: cryptoJS.enc.Base64.stringify(cryptoJS.SHA512(selSecret + req.body.email)),
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    }
  };

  exports.login = (req, res, next) => {
    User.findOne({ email:cryptoJS.enc.Base64.stringify(cryptoJS.SHA512(selSecret + req.body.email))})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.DB_TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };