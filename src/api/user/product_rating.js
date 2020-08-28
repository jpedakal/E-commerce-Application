const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.post('/product_rating', passport.authenticate('jwt', { session: false }), (req, res) => {
    const payload = {
        id: req.body._id,
        rating: req.body.rating,
        review: req.body.review
    };
    const filterCondition = { cpf: req.user[0].cpf }
    mongo.findDocuments('user', filterCondition)
        .then(doc => {
            
        })
});