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
    console.log('tokenId', token.id)
    stripe.customers.create({
      email: req.body.email,
      source: token.id
    }).then(customer => stripe.charges.create({
      amount: req.body.total_amount,
      currency: 'INR',
      customer: customer.id
    }).then(data =>
      order_data.invoice = data.receipt_url,
      order_data.ordered_on = new Date(),
      console.log('order data', data),
      mongo.findDocuments('user', FilterCondition)
        .then(data => {
          // const new_orders = data[0].past_orders.push(order_data);
          mongo.updateDocument('user', FilterCondition, { past_orders: data[0].past_orders })
            .then(result => res.status(200).json(result))
            .catch(err => res.json(err));
        }))
    );
  });
});

module.exports = router;
