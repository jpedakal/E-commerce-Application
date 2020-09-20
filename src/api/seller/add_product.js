const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const isAdmin = require('../../config/admin');
const validation = require('../../utils/validator');
const cloudinary = require('cloudinary');

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
//upload.single('productImage'),
router.post('/add_product', (req, res) => {

  const payload = {
    create_ts: Date(),
    update_ts: Date()
  };

  payload.specifications = req.body;

  // const productValidation = validation.selleradd_Product(payload);
  // if (Object.keys(productValidation).length !== 0) {
  //   res.status(404).json(productValidation);
  // } else {
  mongo.insertDocuments('products', payload)
    .then(data => res.json({ "message": "product added successfully" }))
    .catch(err => res.json(err));
  //}
});

module.exports = router;