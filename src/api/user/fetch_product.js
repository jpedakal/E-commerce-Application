const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');

router.get('/product_info', (req, res) => {
  const FilterCondition = {
    id: req.query.id
  };
 
  if (req.query.id) {
    mongo.findDocumentsById('product', FilterCondition)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err));
  } else {
    mongo.findDocuments('product', {})
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err));
  }

});

module.exports = router;

