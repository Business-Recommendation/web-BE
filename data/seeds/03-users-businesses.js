
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users-businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('users-businesses').insert([
        {
          id: 1, 
          user_id: 3, 
          business_id: 1,
          yelp_url: 'https://www.yelp.com/biz/upstate-new-york-2?osq=Restaurants'
        },
        {
          id: 2, 
          user_id: 3, 
          business_id: 4,
          yelp_url: 'https://www.yelp.com/biz/gogi-37-new-york?osq=Restaurants'

        },
        {
          id: 3, 
          user_id: 1, 
          business_id: 1,
          yelp_url: 'https://www.yelp.com/biz/upstate-new-york-2?osq=Restaurants'
        },
        {
          id: 4, 
          user_id: 1, 
          business_id: 2,
          yelp_url: 'https://www.yelp.com/biz/uglyduckling-brooklyn?osq=Restaurants'
        },
        {
          id: 5, 
          user_id: 1, 
          business_id: 6,
          yelp_url: 'https://www.yelp.com/biz/per-se-new-york?osq=Restaurants'
        },
        {
          id: 6, 
          user_id: 2, 
          business_id: 5,
          yelp_url: 'https://www.yelp.com/biz/north-river-lobster-co-new-york?osq=Restaurants'
        },
        {
          id: 7, 
          user_id: 2, 
          business_id: 4,
          yelp_url: 'https://www.yelp.com/biz/gogi-37-new-york?osq=Restaurants'
        },
        {
          id: 8, 
          user_id: 2, 
          business_id: 3,
          yelp_url: 'yelp.com/biz/atrium-dumbo-brooklyn?osq=Restaurants'
        },
      ]);
    });
};

