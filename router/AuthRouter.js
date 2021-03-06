const express = require('express');
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/GenerateToken');
const LoginBodyVerify = require('../middleware/LoginBody');
const RegisterBodyVerify = require('../middleware/RegisterBody');
const Users = require('../data-models/user_data_model');
const router = express.Router();

router.post('/register', RegisterBodyVerify, (req,res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 12)

    newUser.password = hash;

    Users.addUser(newUser)
        .then(added => {
            res.status(201).json('New user has been added to the database')
        })
        .catch(err => {
            res.status(400).json({ error: "User already exist, User/Pass is too long, or database connection has failed" })
        })
})


router.post('/login', LoginBodyVerify, (req,res) => {
    const {username, password} = req.body;
//&& bcrypt.compareSync(password, user.password)
    Users.findByUsername({username})
        .first()
        .then(user => {
            if(user){
                const token = generateToken(user);
                res.status(200).json({token})    
            }else{
                res.status(401).json({ error: 'Invalid username or password, please try again with a new one' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.get('/users',  (req,res) => {

    Users.findAllUsers()
        .then(bizArr => {
            res.status(200).json(bizArr)
        })
        .catch(err => {
            res.status(400).json({ error: "Database connection has failed" })
        })
})

module.exports = router;