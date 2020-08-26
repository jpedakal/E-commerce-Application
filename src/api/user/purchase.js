const express = require('express');
const router = express.Router();
const passport = require('passport');
const stripe = require('stripe')(process.env.SECRET_KEY);
const mongo = require('../../database/mongo_db');

router.post('/purchase', passport.authenticate('jwt', { session: false }), (req, res) => {

  const order_data = {
    model: req.body.model,
    quantity: req.body.quantity,
    offer_price: req.body.offer_price
  };

  const FilterCondition = {
    cpf: req.user[0].cpf
  };

  stripe.tokens.create({
    card: {
      number: req.body.number,
      exp_month: req.body.exp_month,
      exp_year: req.body.exp_year,
      cvc: req.body.cvc
    }
  }).then(token => {
    stripe.customers.create({
      email: req.body.email,
      source: token.id
    }).then(customer => stripe.charges.create({
      amount: req.body.total_amount,
      currency: 'INR',
      customer: customer.id
    }).then(data => {
      mongo.updateHistory('user', FilterCondition, order_data)
        .then(result => res.status(200).json(result))
        .catch(err => res.json(err));
    })
    )
  })
});

module.exports = router;
