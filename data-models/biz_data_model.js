const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    addBiz,
    findBy,
    bizDB,
    updateBiz,
    removeOnlyBiz,
    addTerms
}

function addBiz(newBiz, userID, username){
    return db('businesses')
        .insert({name: newBiz.name})
        .then(newBizId => {
            console.log(newBizId)
            return db('users-businesses')
                .insert({ user_id: userID, business_id: newBizId[0], yelp_url: newBiz.yelp_url})
        })
        .then(added => {
            return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
            .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
            .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
            .select('businesses.id', 'businesses.name', 'users-businesses.yelp_url') //select biz id and name
            .where({username}) //users.username = username //filter biz array for specific user's listings
            .then(array => { 
                return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                    .then(term_array => {  
                        const newArray = array.map(biz_object => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                            const termsInsideBiz = [];
                            term_array.map(term_object => {
                                if(biz_object.id === term_object.business_id){
                                    termsInsideBiz.push(term_object)
                                }
                            })
                            return {...biz_object, data: termsInsideBiz}
                        })
                        return newArray;//terms: array of objects of related terms to business
                    }) 
            })
        })
}

function findBy(username){
    return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
        .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
        .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
        .select('businesses.id', 'businesses.name', 'users-businesses.yelp_url') //select biz id and name
        .where({username}) //users.username = username //filter biz array for specific user's listings
        .then(biz_arr => { 
            return db('data') // query terms table
                .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                .then(term_arr => {  
                    const newArr = biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                        const termsInsideBiz = [];
                        term_arr.map(term_obj => {
                            if(biz_obj.id === term_obj.business_id){
                                termsInsideBiz.push(term_obj)
                            }
                        })
                        return {...biz_obj, data: termsInsideBiz}
                    })
                    return newArr;//terms: array of objects of related terms to business
                }) 
        })
}


function bizDB(){   
    return db('users-businesses')
}


function removeOnlyBiz(id, userId, username){   
    return db('users-businesses')   //query user table    //array of table 
        .where({user_id: userId, business_id: id}) //filters user_id column for value
        .del()
        .then(added => {
            return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
            .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
            .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
            .select('businesses.id', 'businesses.name', 'users-businesses.yelp_url') //select biz id and name
            .where({username}) //users.username = username //filter biz array for specific user's listings
            .then(array => { 
                return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                    .then(term_array => {  
                        const newArray = array.map(biz_object => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                            const termsInsideBiz = [];
                            term_array.map(term_object => {
                                if(biz_object.id === term_object.business_id){
                                    termsInsideBiz.push(term_object)
                                }
                            })
                            return {...biz_object, data: termsInsideBiz}
                        })
                        return newArray;//terms: array of objects of related terms to business
                    }) 
            })
        })
}
// if(businesses.id === par.business_id && businesses.id === id){
//     .del()
// }


function updateBiz(changes, id, userId, username){
    return db('users-businesses')   //query user table    //array of table 
        .where({user_id: userId, business_id: id})//filters user_id column for value
        .update(changes)
        .then(added => {
            return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
            .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
            .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
            .select('businesses.id', 'businesses.name', 'users-businesses.yelp_url') //select biz id and name
            .where({username}) //users.username = username //filter biz array for specific user's listings
            .then(array => { 
                return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                    .then(term_array => {  
                        const newArray = array.map(biz_object => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                            const termsInsideBiz = [];
                            term_array.map(term_object => {
                                if(biz_object.id === term_object.business_id){
                                    termsInsideBiz.push(term_object)
                                }
                            })
                            return {...biz_object, data: termsInsideBiz}
                        })
                        return newArray;//terms: array of objects of related terms to business
                    }) 
            })
        })
}



//what happens when a user updates restaurant that another person also owns?
//changes all entry names 

function addTerms(newTerms){
    return db('terms')
        .then(res => {
            console.log(res)
        })
}