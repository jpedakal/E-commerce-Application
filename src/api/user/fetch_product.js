const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');

router.get('/product_info', (req, res) => {
  const FilterCondition = {
    _id: req.query._id
  };
 
  if (req.query._id) {
    mongo.findDocumentsById('product', FilterCondition)
      .then(data => res.json(data))
      .catch(err => res.json(err));
  } else {
    mongo.findDocuments('product', {})
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }
});

module.exports = router;
