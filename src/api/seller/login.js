const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const validation = require('../../utils/validator');
const rateLimit = require('express-rate-limit');
const exceptionHandler= require('../../utils/exceptionHandler');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.post('/login', apiLimiter, (req, res) => {
  const payload = {
    mobile: req.body.mobile,
    password: req.body.password
  };

  const loginValidation = validation.sellerLogin(req.body);
  if (Object.keys(loginValidation).length !== 0) {
    res.status(400).json(loginValidation);
  } else {
    mongo.authentication('user', payload)
      .then(data => res.status(200).json(data))
      .catch(err => res(exceptionHandler.errorHandler(err)));
  }
});

module.exports = router;