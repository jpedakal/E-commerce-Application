const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongo = require('../../database/mongo_db');

router.post('/register', (req, res) => {

  const data= req.body;
  /* const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        cpf: req.body.cpf,
        role: 0,
        cart: [],
        past_orders: [],
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth,
        mobile: req.body.mobile,
        password: req.body.password,
        create_ts: new Date(),
        update_ts: new Date()
    }; */

  bcrypt.genSalt(saltRounds)
    .then(salt => bcrypt.hash(data.password, salt)
      .then(hash => {
        data.password = hash,
        mongo.insertDocuments('user', data)
          .then(data => res.status(200).json(data))
          .catch(err => res.json(err));
      })
    );
});

module.exports = router;