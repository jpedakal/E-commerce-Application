const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const ObjectId = require('mongodb').ObjectID;
const passport = require('passport');
const isAdmin = require('../../config/admin');

router.post('/update_product', passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {

  const filterCondition = {
    _id: ObjectId(req.params.id)
  };

  const payload = req.body;
  payload.update_ts = new Date();

  mongo.updateDocument('products', filterCondition, payload)
    .then(data => res.status(200).json(data))
    .catch(err => res.json(err));
});


module.exports = router;
