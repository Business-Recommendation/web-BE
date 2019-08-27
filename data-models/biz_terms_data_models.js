const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    addBiz,
    findAllBiz,
    findSingleBiz,
}

function addBiz(newBiz){
    return db('businesses')
        .insert(newBiz);
}

function findAllBiz(){
    return db('businesses');
}

function findSingleBiz(name){
    return db('businesses')
        .where(name);
}
