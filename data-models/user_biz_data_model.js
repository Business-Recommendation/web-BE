const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    addUser,
    find,
    findByName,
}

function addUser(user){
    return db('users')
        .insert(user);
}

function find(){
    return db('users');
}

function findByName(username){
    return db('users')
        .where(username);
}
