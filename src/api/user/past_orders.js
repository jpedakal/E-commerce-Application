const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.get('/past_orders', passport.authenticate('jwt', { session: false }), (req, res) => {

    let filterCondition = { cpf: req.user[0].cpf }
    
    if (req.query.id) {
        mongo.findDocuments('user', filterCondition)
            .then(doc => {
                let data = doc[0].past_orders;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === req.query.id) {
                        res.json(data[i])
                    } else continue
                }
            })
            .catch(err => res.json(err));
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
