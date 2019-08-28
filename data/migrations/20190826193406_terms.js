exports.up = function(knex) {
    return knex.schema
        .createTable('data', tbl => {
            tbl.increments('id');
            tbl.text('term')
                .notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('data')
};