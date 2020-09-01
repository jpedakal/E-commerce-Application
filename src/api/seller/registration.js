const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongo = require('../../database/mongo_db');
const validation = require('../../utils/validator');

// Seller Registration
router.post('/register', (req, res) => {
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    cpf: req.body.cpf,
    role: 1,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    mobile: req.body.mobile,
    password: req.body.password,
    created_ts: new Date(),
    updated_ts: new Date()
  };

  const sellerValidation = validation.sellerRegister(req.body);
  if (Object.keys(sellerValidation).length !== 0) {
    res.status(404).json(sellerValidation);
  } else {

    mongo.findDocumentsById('user', {
      mobile: req.body.mobile
    })
      .then(user => {
        if (user.length !== 0) res.status(404).json({
          message: 'User Id already exist'
        });
        else {
          bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(data.password, salt)
              .then(hash => {
                if (hash) {
                  data.password = hash; 
                  mongo.insertDocuments('user', data)
                    .then(data => {
                      //console.log(res);
                      res.status(200).json(data);
                    })
                    .catch(err => res.json(err));
                }
              })
            );
        }
      });
  }
});

module.exports = router;
