const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.get('/product_rating', passport.authenticate('jwt', { session: false }), (req, res) => {

    const productId = req.query._id;
    const filterCondition = { cpf: req.user[0].cpf }

    mongo.findDocuments('user', filterCondition)
        .then(doc => {
            let data = doc[0].past_orders;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === productId) {
                    res.json({ "success": "true" });
                    break;
                } else if (i !== data.length - 1) {
                    continue;
                } else {
                    res.json({ "message": "Sorry! you haven't purchased this product" });
                }
            }
        })
        .catch(err => res.json(err));
});


module.exports = router;