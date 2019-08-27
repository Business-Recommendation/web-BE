const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    addBiz,
    findBy,
    bizDB,
    removeBiz
}

function addBiz(newBiz){
    return db('businesses')
        .insert(newBiz);
}

function findBy(username){
    return db('users')        
        .select('businesses.id', 'businesses.name')
        .join('users-businesses', 'users.id', 'users-businesses.user_id')
        .join('businesses', 'users-businesses.business_id', 'businesses.id')
        // .join('businesses-terms', 'businesses.id', 'businesses-terms.business_id')
        // .join('terms', 'businesses-terms.term_id', 'terms.id')
        .where(username, '=', 'users.username')
        .then(biz_arr => { 
            return db('terms')
                .join('businesses-terms', 'terms.id', 'businesses-terms.term_id')
                .join('businesses', 'businesses-terms.business_id', 'businesses.id')
                .select('terms.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                .then(term_arr => {  

                    //trying to create new Array. map over terms array and identify those that 
                    //share the same business Id as the business listing array and push to array for that listing
                    const newArr = biz_arr.map(biz_obj => {
                        const termsInsideBiz = [];
                        term_arr.map(term_obj => {
                            if(biz_obj.id === term_obj.business_id){
                                termsInsideBiz.push(term_obj)
                            }
                        })
                        return {...biz_obj, terms: termsInsideBiz}
                    })
                    return newArr;
                })
        })
}


function removeBiz(id){
    return db('businesses')
        .delete(id);
}

function bizDB(){   
    return db('businesses')
}