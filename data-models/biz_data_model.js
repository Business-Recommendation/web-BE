const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    addBiz,
    findBy,
    bizDB,
    updateBiz,
    removeOnlyBiz
}

function addBiz(newBiz, userID){
    return db('businesses')
        .insert(newBiz)
        .then(newBizId => {
            return db('users-businesses')
                .insert({ user_id: userID, business_id: newBizId[0] })
        })
}

function findBy(username){
    return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
        .select('businesses.id', 'businesses.name') //select biz id and name
        .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
        .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
        .where({username}) //users.username = username //filter biz array for specific user's listings
        .then(biz_arr => { 
            return db('data') // query terms table
                .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                .then(term_arr => {  
                    biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                        const termsInsideBiz = [];
                        term_arr.map(term_obj => {
                            if(biz_obj.id === term_obj.business_id){
                                termsInsideBiz.push(term_obj)
                            }
                        })
                        return {...biz_obj, data: termsInsideBiz}
                    })
//terms: array of objects of related terms to business
                }) //current end product is an array of business objects with the following keys:
                        //id: business's id,
                        //name: business's name,
        })
}


function bizDB(){   
    return db('businesses')
}


function removeOnlyBiz(id, userId){   
    return db('users-businesses')   //query user table    //array of table 
        .where({user_id: userId, business_id: id}) //filters user_id column for value
        .del();
}
// if(businesses.id === par.business_id && businesses.id === id){
//     .del()
// }


function updateBiz(changes, id){
    return db('businesses')
        .where({id})
        .update(changes)

// }
    //     console.log(changes) 
    // return db('businesses')
    //     .join('users-businesses', 'businesses.id', 'users-businesses.business_id')
    //     // .where( {id: id, user_id: userId} )
    //     .select('businesses.id', 'businesses.name', 'businesses.yelp_url')
    //     // .update({ name: 'Hello'})
    //     .then(res => {
    //         console.log(res)
    //     })
}



//what happens when a user updates restaurant that another person also owns?
//changes all entry names 

