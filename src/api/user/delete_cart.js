const express = require('express');
const router = express.Router();
const mongo = require('../../database/mongo_db');
const passport = require('passport');

router.delete('/delete_cart/:title', passport.authenticate('jwt', { session: false }), (req, res) => {

    const title = req.params.title;
    const payload = { cpf: req.user[0].cpf };
    mongo.deleteCartItem('user', payload, title)
        .then(data => res.status(200).json({"message":"item removed from cart successfully"}))
        .catch(err => res.json(err));
});

module.exports = router;
