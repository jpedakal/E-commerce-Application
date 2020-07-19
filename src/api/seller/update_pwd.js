const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.post('/update_pwd', passport.authenticate('jwt', { session: false }), (req, res) => {
  const payload = {
    password: req.body.password,
    update_ts: new Date()
  };
  const FilterCondition = {
    mobile: req.user[0].mobile
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