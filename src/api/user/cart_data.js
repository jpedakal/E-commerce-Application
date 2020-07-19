const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.get('/cart_data', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  const payload = {cpf: req.user[0].cpf};
   
  mongo.findDocuments('user', payload)
    .then(data=> res.status(200).json(data[0].cart))
    .catch(err=> res.json(err));
}); 

module.exports = router;