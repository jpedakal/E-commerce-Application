const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongo = require('../../database/mongo_db');

router.post('/update_user_info', passport.authenticate('jwt', { session: false }), (req, res) => {
    const filterConditon = { cpf: req.user[0].cpf };
    const payload = req.body;
    payload.update_ts = Date();
    mongo.updateDocument('user', filterConditon, payload)
        .then(doc => res.json({ "message": "User info updated successfully" }))
        .catch(err => res.json(err));
});

module.exports = router;