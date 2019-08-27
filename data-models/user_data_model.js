const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    addUser,
    findAllUsers,
    findByUsername,
}

function addUser(user){
    return db('users')
        .insert(user);
}

function findAllUsers(){
    return db('users');
}

function findByUsername(username){
    return db('users')
        .where(username);
}
