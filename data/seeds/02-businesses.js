
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {
          id: 1, 
          name: 'Upstate', 
          yelp_url: 'https://www.yelp.com/biz/upstate-new-york-2?osq=Restaurants'
        },
        {
          id: 2, 
          name: 'Uglyduckling', 
          yelp_url: 'https://www.yelp.com/biz/uglyduckling-brooklyn?osq=Restaurants'
        },
        {
          id: 3, 
          name: 'Atrium Dumbo', 
          yelp_url: 'yelp.com/biz/atrium-dumbo-brooklyn?osq=Restaurants'
        },
        {
          id: 4, 
          name: 'GOGI 37', 
          yelp_url: 'https://www.yelp.com/biz/gogi-37-new-york?osq=Restaurants'
        },
        {
          id: 5, 
          name: 'North River Lobster Co', 
          yelp_url: 'https://www.yelp.com/biz/north-river-lobster-co-new-york?osq=Restaurants'
        },
        {
          id: 6, 
          name: 'Per Se', 
          yelp_url: 'https://www.yelp.com/biz/per-se-new-york?osq=Restaurants'
        },
      ]);
    });
};
