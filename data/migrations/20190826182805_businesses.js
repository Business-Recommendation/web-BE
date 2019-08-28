
exports.up = function(knex) {
    return knex.schema
        .createTable('businesses', tbl => {
            tbl.increments('id');
            tbl.text('name')
                .notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('businesses');
};
