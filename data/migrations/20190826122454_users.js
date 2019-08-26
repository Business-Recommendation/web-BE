
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id');
            tbl.text('email')
                .notNullable();
            tbl.text('username', 24)
                .notNullable()
                .unique();
            tbl.text('password', 24)
                .notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
};
