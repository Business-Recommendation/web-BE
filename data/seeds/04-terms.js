
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('data').del()
    .then(function () {
      // Inserts seed entries
      return knex('data').insert([
        {id: 1, term: 'dim'},
        {id: 2, term: 'rude'},
        {id: 3, term: 'overpriced'},
        {id: 4, term: 'service'},
        {id: 5, term: 'wait'},
        {id: 6, term: 'value'},
        {id: 7, term: 'friendly'},
        {id: 8, term: 'awesome'},
        {id: 9, term: 'vibe'},
        {id: 10, term: 'seating'},
        {id: 11, term: 'delicious'}
      ]);
    });
};
