
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users-businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('users-businesses').insert([
        {
          id: 1, 
          user_id: 3, 
          business_id: 1
        },
        {
          id: 2, 
          user_id: 3, 
          business_id: 4
        },
        {
          id: 3, 
          user_id: 1, 
          business_id: 1
        },
        {
          id: 4, 
          user_id: 1, 
          business_id: 2
        },
        {
          id: 5, 
          user_id: 1, 
          business_id: 6
        },
        {
          id: 6, 
          user_id: 2, 
          business_id: 5
        },
        {
          id: 7, 
          user_id: 2, 
          business_id: 4
        },
        {
          id: 8, 
          user_id: 2, 
          business_id: 3
        },
      ]);
    });
};

