
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          email: 'bob@yahoo.com', 
          username: 'Bob', 
          password: 'password'
        },
        {
          id: 2, 
          email: 'bobby@yahoo.com', 
          username: 'Bobby', 
          password: 'password'
        },        
        {
          id: 3, 
          email: 'bobert@yahoo.com', 
          username: 'Bobert', 
          password: 'password'
        },
      ]);
    });
};