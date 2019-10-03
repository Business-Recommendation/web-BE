const express = require('express');

const Biz = require('../data-models/biz_data_model');
const verifyHeader = require('../middleware/VerifyHeader');
const router = express.Router();

router.post('/listings', verifyHeader, (req,res) => {
    const newBiz = req.body;
    const userID = req.jwtToken.subject;
    const { username } = req.jwtToken;

    Biz.addBiz(newBiz, userID, username)
        .then(added => {
            res.status(201).json(added)
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

router.get('/listings/get/:id', verifyHeader, (req,res) => {
    const Bizid = req.params.id;

    Biz.findBizByID(Bizid)
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
    const { username } = req.jwtToken;

    Biz.removeOnlyBiz(Bizid, UserId, username)
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
    const { username } = req.jwtToken;

    Biz.updateBiz(changes, Bizid, UserId, username)
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