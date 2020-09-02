const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.delete('/delete_cart', passport.authenticate('jwt', { session: false }), (req, res) => {

    const id = req.query.id;
    const payload = { cpf: req.user[0].cpf };
    mongo.deleteCartItem('user', payload, id)
        .then(data => res.json({"message":"item removed from cart successfully"}))
        .catch(err => res.json(err));
});

module.exports = router;
