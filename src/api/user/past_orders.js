const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.get('/past_orders', passport.authenticate('jwt', { session: false }), (req, res) => {
    const filterCondition = { cpf: req.user[0].cpf }
    if (req.query.id) {
        mongo.findDocumentsById('user', filterCondition)
            .then(doc => {
                res.json(doc);
            })
    } else {
        mongo.findDocuments('user', filterCondition)
            .then(data => {
                let output = data[0].past_orders;
                res.json(output)
            })
            .catch(err => res.json(err));
    }
});

module.exports = router;