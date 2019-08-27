const express = require('express');

const Biz = require('../data-models/biz_data_model');
const router = express.Router();

router.post('/listings',  (req,res) => {
    const newListing = req.body;

    Biz.addBiz(newListing)
        .then(added => {
            res.status(201).json('New bizness has been added to the database')
        })
        .catch(err => {
            res.status(400).json({ error: "Database connection has failed" })
        })
})

router.get('/listings',  (req,res) => {
    const { username } = req.jwtToken;
    console.log(req.jwtToken)

    Biz.findBy({ username })
        .then(bizArr => {
            res.status(200).json(bizArr)
        })
        .catch(err => {
            res.status(400).json({ error: "Database connection has failed" })
        })
})


router.delete('/listings/:id', (req, res) => {
    const {id} = req.params
    Biz.removeBiz({id})
        .then(removedBiz => {
            removedBiz.status(200).json(removedBiz)
        })
        .catch(err => {
            res.status(500).json({ error: 'Couldnt remove Biz' })
        })
})


router.get('/', (req, res) => {
    Biz.bizDB()
        .then(response => {
            res.json(response)
        })
})
module.exports = router;