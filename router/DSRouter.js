const express = require('express');

const Biz = require('../data-models/biz_data_model');
const router = express.Router();

router.post('/terms', (req,res) => {
    const terms = req.body;

    Biz.addTerms(terms)
    .then(newTerms => {
        res.status(201).json({ message: 'New Terms added to Business' })
    })
    .catch(err => {
        res.status(400).json({ error: 'New Terms Failed to Be Added to the Business' })
    })
})


module.exports = router;