const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const isAdmin = require('../../config/admin');
const validation = require('../../utils/validator');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/upload/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname);
//     }
// });

// const fileFilter = function (req, file, cb) {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

var upload = multer({
  dest: 'upload/'
});

const mongo = require('../../database/mongo_db');

router.post('/add_product', upload.single('productImage'), passport.authenticate('jwt', { session: false }), isAdmin, (req, res) => {

  const payload = {
    category: req.body.category,
    brand: req.body.brand,
    model: req.body.model,
    actual_price: req.body.actual_price,
    offer_price: req.body.offer_price,
    productImage: req.file.path,
    quantity: req.body.quantity,
    description: req.body.description,
    create_by: req.user[0].mobile,
    create_ts: new Date(),
    update_ts: new Date()
  };

  const productValidation = validation.selleradd_Product(payload);
  if (Object.keys(productValidation).length !== 0) {
    res.status(404).json(productValidation);
  } else {
    mongo.insertDocuments('products', payload)
      .then(data => res.status(200).json(data))
      .catch(err => res.json(err));
  }
});

module.exports = router;
