const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');

router.post('/login', (req, res) => {
  const payload = {
    mobile: req.body.mobile,
    password: req.body.password
  };

  mongo.authentication('user', payload)
    .then(data => res.json({"message":"Authentication Successful", "token": data}))
    .catch(err => res.json(err));
});

module.exports = router;
