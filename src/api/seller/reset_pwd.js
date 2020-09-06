const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
//const mailer = require('nodemailer');
const randToken = require('rand-token');
var token = randToken.generate(16);
const bcrypt = require('bcrypt');

router.post('/reset_user', (req, res) => {
  const FilterCondition = {
    mobile: req.body.mobile
  };
  const payload = {
    reset_token: token,
    update_ts: new Date()
  };

  mongo.findDocuments('seller', FilterCondition)
    .then(data => {
      mongo.updateDocument('seller', FilterCondition, payload)
        .then(result => res.status(200).json(result))
        .catch(err => res.json(err));

    });
});

router.post('/reset_pwd/:token', (req, res) => {
  const FilterCondition = {
    reset_token: req.params.token
  };
  const payload = {
    password: req.body.password, update_ts: new Date(), reset_token: ''
  };
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(payload.password, salt)
      .then(hash => {
        payload.password = hash;
        mongo.updateDocument('seller', FilterCondition, payload)
          .then(result => res.status(200).json(result));
      })
    );
});

module.exports = router;
