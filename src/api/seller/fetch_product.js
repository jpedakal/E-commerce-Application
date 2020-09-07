const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongo = require('../../database/mongo_db');
const isAdmin = require('../../config/admin');

router.get('/fetch_product', passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {

  const FilterCondition = {
    create_by: req.user[0].mobile
  };

  mongo.findDocumentsById('products', FilterCondition)
    .then(data => res.status(200).json(data))
    .catch(err => res.json(err));
});

module.exports = router;
