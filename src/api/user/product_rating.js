const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.post('/product_rating/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('requser', req.user[0])
    const payload = {
        rating: req.body.rating,
        review: req.body.review,
        user: req.user[0].firstName,
        create_ts: Date()
    };
    const filterCondition = { _id: req.params.id }
    mongo.findDocumentsById('product', filterCondition)
        .then(data => {
            data.comments.push(payload);
            mongo.updateDocument('product', filterCondition, { comments: data.comments })
                .then(item => res.json({ "message": "Added rating and review successfully" }))
                .catch(err => res.json(err));
        });
});

module.exports = router;