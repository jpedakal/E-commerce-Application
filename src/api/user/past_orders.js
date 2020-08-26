const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.get('/past_orders', passport.authenticate('jwt', { session: false }), (req, res) => {
    const filterCondition = { cpf: req.user[0].cpf }
    mongo.findDocumentsById('user', filterCondition)
        .then(data => {
            let output = data.past_orders;
            res.json(output)
        })
        .catch(err => res.json(err));
});

module.exports = router;