
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses-terms').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses-terms').insert([
        {
          id: 1, 
          term_id: 1, 
          business_id: 2, 
          highratingscore: .15,
          poorratingscore: .97
        },
        {
          id: 2, 
          term_id: 2, 
          business_id: 4, 
          highratingscore: .09,
          poorratingscore: .98
        },
        {
          id: 3, 
          term_id: 5, 
          business_id: 6, 
          highratingscore: .07,
          poorratingscore: .93
        },
        {
          id: 4, 
          term_id: 4, 
          business_id: 3, 
          highratingscore: .05,
          poorratingscore: .96
        },
        {
          id: 5, 
          term_id: 3, 
          business_id: 2, 
          highratingscore: .97,
          poorratingscore: .64
        },
        {
          id: 6, 
          term_id: 6, 
          business_id: 1, 
          highratingscore: .97,
          poorratingscore: .24
        },
        {
          id: 7, 
          term_id: 8, 
          business_id: 5, 
          highratingscore: .90,
          poorratingscore: .30
        },
        {
          id: 8, 
          term_id: 7, 
          business_id: 5, 
          highratingscore: .93,
          poorratingscore: .14
        },
        {
          id: 9, 
          term_id: 10, 
          business_id: 1, 
          highratingscore: .85,
          poorratingscore: .09
        },
        {
          id: 10, 
          term_id: 10, 
          business_id: 4, 
          highratingscore: .84,
          poorratingscore: .21
        },
        {
          id: 11, 
          term_id: 8, 
          business_id: 6, 
          highratingscore: .93,
          poorratingscore: .19
        },
        {
          id: 12, 
          term_id: 4, 
          business_id: 3, 
          highratingscore: .55,
          poorratingscore: .74
        },
        {
          id: 13, 
          term_id: 4, 
          business_id: 2, 
          highratingscore: .37,
          poorratingscore: .86
        },
        {
          id: 14, 
          term_id: 6, 
          business_id: 5, 
          highratingscore: .99,
          poorratingscore: .02
        },
        {
          id: 15, 
          term_id: 8, 
          business_id: 5, 
          highratingscore: .99,
          poorratingscore: .04
        },
        {
          id: 16, 
          term_id: 7, 
          business_id: 1, 
          highratingscore: .98,
          poorratingscore: .21
        },
      ]);
    });
};