const db = require('../dbConfig');
const axios = require('axios')

module.exports = {
    addBiz,
    findBy,
    bizDB,
    updateBiz,
    removeOnlyBiz,
    findBizByID
}

function addBiz(newBiz, userID, username){      
    const termArraynew = [];
    return db('businesses')
    .insert({name: newBiz.name})
    .then(newBizId => {
        return db('users-businesses')
        .insert({ user_id: userID, business_id: newBizId[0], yelp_url: newBiz.yelp_url})
        .then(new_user_business_id => {
            const postBody = { yelp_url: newBiz.yelp_url }
            axios   
            .post('https://yelp-reviews.herokuapp.com/api/terms', postBody)
            .then(terms => {
                for(key in terms.data){
                    if(terms.data.hasOwnProperty(key)){
                        const obj = terms.data[key]
                        termArraynew.push(obj);
                        db('data')
                            .insert({term: obj.term})
                            .then(termID => {
                                return db('businesses-terms')
                                .insert({ term_id: termID[0], business_id: newBizId[0], highratingscore: obj.highratingscore, poorratingscore: obj.poorratingscore})
                            })
                    }
                }
            })
            .catch(err => {
                console.log('ERROR')
            })
        })

        //INSERTED ALL INCOMING DATA INTO DB ----- HERE ON OUT IS RESPONSE MODELING   

        .then(added => {
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
                    return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                    .orderBy('businesses-terms.highratingscore', 'DESC')
                    .then(topHighScores => {
                        return db('data') // query terms table
                        .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                        .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                        .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                        .orderBy('businesses-terms.poorratingscore', 'DESC')
                        .then(topPoorScores => {
                            const newArr = biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                                const topHightermsInsideBiz = [];
                                const topPoortermsInsideBiz = [];
                                const dataObject ={};
                                topHighScores.map(term_obj => {
                                    if(biz_obj.id === term_obj.business_id){
                                        topHightermsInsideBiz.push(term_obj.term)
                                    }
                                })
                                topPoorScores.map(term_obj => {
                                    if(biz_obj.id === term_obj.business_id){
                                        topPoortermsInsideBiz.push(term_obj.term)
                                    }
                                })
                                dataObject['highratingterms'] = topHightermsInsideBiz;
                                dataObject['lowratingterms'] = topPoortermsInsideBiz;

                                return {...biz_obj, data: dataObject}
                            })
                            // return newArr;//terms: array of objects of related terms to business
                            return newArr;
                        })
                    }) 
                })
            })
        })
    })  
}

function findBizByID(id){
    return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
        .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
        .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
        .select('businesses.id', 'businesses.name', 'users-businesses.yelp_url') //select biz id and name
        .where('businesses.id', '=', id) //users.username = username //filter biz array for specific user's listings
        .then(biz_arr => { 
            return db('data') // query terms table
                .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                .then(term_arr => {
                    return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                    .orderBy('businesses-terms.highratingscore', 'DESC')
                    .then(topHighScores => {
                        return db('data') // query terms table
                        .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                        .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                        .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                        .orderBy('businesses-terms.poorratingscore', 'DESC')
                        .then(topPoorScores => {
                            const newArr = biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                                const topHightermsInsideBiz = [];
                                const topPoortermsInsideBiz = [];
                                const dataObject ={};
                                topHighScores.map(term_obj => {
                                    if(biz_obj.id === term_obj.business_id){
                                        topHightermsInsideBiz.push(term_obj.term)
                                    }
                                })
                                topPoorScores.map(term_obj => {
                                    if(biz_obj.id === term_obj.business_id){
                                        topPoortermsInsideBiz.push(term_obj.term)
                                    }
                                })
                                dataObject['highratingterms'] = topHightermsInsideBiz;
                                dataObject['lowratingterms'] = topPoortermsInsideBiz;

                                return {...biz_obj, data: dataObject}
                            })
                            return newArr;//terms: array of objects of related terms to business
                        })
                    }) 
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
            .then(biz_arr => { 
                return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id') //select term name, highrating, poorrating, business_id
                    .then(term_arr => {
                        return db('data') // query terms table
                        .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                        .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                        .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                        .orderBy('businesses-terms.highratingscore', 'DESC')
                        .then(topHighScores => {
                            return db('data') // query terms table
                            .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                            .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                            .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                            .orderBy('businesses-terms.poorratingscore', 'DESC')
                            .then(topPoorScores => {
                                const newArr = biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                                    const topHightermsInsideBiz = [];
                                    const topPoortermsInsideBiz = [];
                                    const dataObject ={};
                                    topHighScores.map(term_obj => {
                                        if(biz_obj.id === term_obj.business_id){
                                            topHightermsInsideBiz.push(term_obj.term)
                                        }
                                    })
                                    topPoorScores.map(term_obj => {
                                        if(biz_obj.id === term_obj.business_id){
                                            topPoortermsInsideBiz.push(term_obj.term)
                                        }
                                    })
                                    dataObject['highratingterms'] = topHightermsInsideBiz;
                                    dataObject['lowratingterms'] = topPoortermsInsideBiz;
    
                                    return {...biz_obj, data: dataObject}
                                })
                                return newArr;//terms: array of objects of related terms to business
                            })
                        }) 
                    })
            })
        })
}
// if(businesses.id === par.business_id && businesses.id === id){
//     .del()
// }


// .then(new_user_business_id => {
    
// })


function updateBiz(changes, id, userId, username){
    const termArraynew = [];
    return db('users-businesses')   //query user table    //array of table 
        .where({user_id: userId, business_id: id})//filters user_id column for value
        .update({yelp_url: changes.yelp_url})
        .then(updated => {
            return db('businesses-terms')
                .where({business_id: id})
                .delete()
                .then(updated => {
                    axios   
                    .post('https://yelp-reviews.herokuapp.com/api/terms', changes)
                    .then(terms => {
                        for(key in terms.data){
                            if(terms.data.hasOwnProperty(key)){
                                const obj = terms.data[key]
                                console.log(obj)
                                termArraynew.push(obj);
                                db('data')
                                    .insert({term: obj.term})
                                    .then(termID => {
                                        return db('businesses-terms')
                                        .where({business_id: id})
                                        .insert({ term_id: termID[0], business_id: id, highratingscore: obj.highratingscore, poorratingscore: obj.poorratingscore})
                                    })
                            }
                        }
                    })
                    .catch(err => {
                        console.log('ERROR')
                    })
                })
        })
        .then(added => {
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
                        return db('data') // query terms table
                        .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                        .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                        .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                        .orderBy('businesses-terms.highratingscore', 'DESC')
                        .then(topHighScores => {
                            return db('data') // query terms table
                            .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                            .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                            .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                            .orderBy('businesses-terms.poorratingscore', 'DESC')
                            .then(topPoorScores => {
                                const newArr = biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                                    const topHightermsInsideBiz = [];
                                    const topPoortermsInsideBiz = [];
                                    const dataObject ={};
                                    topHighScores.map(term_obj => {
                                        if(biz_obj.id === term_obj.business_id){
                                            topHightermsInsideBiz.push(term_obj.term)
                                        }
                                    })
                                    topPoorScores.map(term_obj => {
                                        if(biz_obj.id === term_obj.business_id){
                                            topPoortermsInsideBiz.push(term_obj.term)
                                        }
                                    })
                                    dataObject['highratingterms'] = topHightermsInsideBiz;
                                    dataObject['lowratingterms'] = topPoortermsInsideBiz;
    
                                    return {...biz_obj, data: dataObject}
                                })
                                return newArr;//terms: array of objects of related terms to business
                            })
                        }) 
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
                    return db('data') // query terms table
                    .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                    .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                    .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                    .orderBy('businesses-terms.highratingscore', 'DESC')
                    .then(topHighScores => {
                        return db('data') // query terms table
                        .join('businesses-terms', 'data.id', 'businesses-terms.term_id') //join with bizterms intermediary table
                        .join('businesses', 'businesses-terms.business_id', 'businesses.id') //join with biz table 
                        .select('data.term', 'businesses-terms.highratingscore', 'businesses-terms.poorratingscore', 'businesses-terms.business_id')
                        .orderBy('businesses-terms.poorratingscore', 'DESC')
                        .then(topPoorScores => {
                            const newArr = biz_arr.map(biz_obj => { //created new Arr with an additional key for each obj -----> ('terms': [termsdata])
                                const topHightermsInsideBiz = [];
                                const topPoortermsInsideBiz = [];
                                const dataObject ={};
                                topHighScores.map(term_obj => {
                                    if(biz_obj.id === term_obj.business_id){
                                        topHightermsInsideBiz.push(term_obj.term)
                                    }
                                })
                                topPoorScores.map(term_obj => {
                                    if(biz_obj.id === term_obj.business_id){
                                        topPoortermsInsideBiz.push(term_obj.term)
                                    }
                                })
                                dataObject['highratingterms'] = topHightermsInsideBiz;
                                dataObject['lowratingterms'] = topPoortermsInsideBiz;

                                return {...biz_obj, data: dataObject}
                            })
                            return newArr;//terms: array of objects of related terms to business
                        })
                    }) 
                })
        })
}

// function findUserBiz(username){
//     return db('users')   //query user table //in a where if not referencing the top table, (table_name.key)    
//         .join('users-businesses', 'users.id', 'users-businesses.user_id') //join with userbiz intermediary table
//         .join('businesses', 'users-businesses.business_id', 'businesses.id') //join with biz table
//         .select('businesses.id', 'businesses.name', 'users-businesses.yelp_url') //select biz id and name
//         .where({username}) //users.username = username //filter biz array for specific user's listings
//         // .then(biz_arr => { 
//         //     console.log(biz_arr)
//         // })
// }