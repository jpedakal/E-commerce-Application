const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');

router.get('/product_info', (req, res) => {
  const FilterCondition = {
    id: req.query.id
  };

  mongo.findDocuments('product', FilterCondition)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json(err));
});

module.exports = router;

