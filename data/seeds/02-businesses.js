
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('businesses').del()
    .then(function () {
      // Inserts seed entries
      return knex('businesses').insert([
        {
          id: 1, 
          name: 'Upstate'
        },
        {
          id: 2, 
          name: 'Uglyduckling'
        },
        {
          id: 3, 
          name: 'Atrium Dumbo'
        },
        {
          id: 4, 
          name: 'GOGI 37'
        },
        {
          id: 5, 
          name: 'North River Lobster Co' 
        },
        {
          id: 6, 
          name: 'Per Se'
        },
      ]);
    });
};
