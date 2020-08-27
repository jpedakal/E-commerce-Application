const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongo = require('../../database/mongo_db');

router.post('/register', (req, res) => {

  // const data= req.body;
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    cpf: req.body.cpf,
    role: 0,
    cart: [],
    past_orders: [],
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    mobile: req.body.mobile,
    password: req.body.password,
    address: req.body.address,
    create_ts:  Date(),
    update_ts:  Date()
  };

  bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(data.password, salt)
      .then(hash => {
        data.password = hash,
          mongo.insertDocuments('user', data)
            .then(data => res.json({"message":"Registered successfully"}))
            .catch(err => res.json(err));
      })
    );
});

module.exports = router;

