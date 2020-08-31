const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.post('/product_rating', passport.authenticate('jwt', { session: false }), (req, res) => {
    const payload = {
        rating: req.body.rating,
        review: req.body.review
    };
    const filterCondition = { id: req.query._id }
    mongo.findDocuments('product', filterCondition)
        .then(data => {
            console.log(data);
            data[0].comments.push(payload);
            mongo.updateDocument('user', FilterCondition, { comments: data[0].comments })
                .then(item => res.json({ "message": "Added rating and review successfully" }))
                .catch(err => res.json(err));
        });
});

module.exports = router;