const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');
const errHandler = require('../../utils/exceptionHandler');

router.post('/add_to_cart', passport.authenticate('jwt', { session: false }), (req, res) => {

  var payload = req.body;
  const FilterCondition = { cpf: req.user[0].cpf };
  mongo.findDocuments('user', FilterCondition)
    .then(data => {
      data[0].cart.push(payload);
      mongo.updateDocument('user', FilterCondition, { cart: data[0].cart })
        .then(item => res.json({ "message": "product added to cart successfully" }))
        .catch(err => res.json(err));
    });
});

module.exports = router;
