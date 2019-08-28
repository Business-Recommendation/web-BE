const express = require('express');

const Biz = require('../data-models/biz_data_model');
const verifyHeader = require('../middleware/VerifyHeader');
const router = express.Router();

router.post('/listings', verifyHeader, (req,res) => {
    const newBiz = req.body;
    const userID = req.jwtToken.subject;

    Biz.addBiz(newBiz, userID)
        .then(added => {
            res.status(201).json({ message: 'Biz successfully added'})
        })
        .catch(err => {
            res.status(400).json({ error: "Database connection has failed" })
        })
})

router.get('/listings', verifyHeader, (req,res) => {
    const { username } = req.jwtToken;


    Biz.findBy(username)
        .then(bizArr => {
            res.status(200).json(bizArr)
        })
        .catch(err => {
            res.status(400).json({ error: "Database connection has failed" })
        })
})


router.delete('/listings/:id', verifyHeader, (req, res) => {
    const Bizid = req.params.id; 
    const UserId = req.jwtToken.subject;

    Biz.removeOnlyBiz(Bizid, UserId)
        .then(removedBiz => {
            res.status(200).json(removedBiz)
        })
        .catch(err => {
            res.status(500).json({ error: 'Couldnt remove Biz' })
        })
})


router.put('/listings/update/:id', verifyHeader, (req, res) => {
    const changes = req.body; 
    const Bizid = req.params.id;
    const UserId = req.jwtToken.subject;

    Biz.updateBiz(changes, Bizid, UserId)
        .then(updatedBiz => {
            res.status(200).json(updatedBiz)
        })
        .catch(err => {
            res.status(500).json({ error: 'Couldnt update Biz' })
        })
})



router.get('/', (req, res) => {
    Biz.bizDB()
        .then(response => {
            res.json(response)
        })
})
module.exports = router;