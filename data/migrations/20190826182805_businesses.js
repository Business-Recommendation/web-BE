
exports.up = function(knex) {
    return knex.schema
        .createTable('businesses', tbl => {
            tbl.increments('id');
            tbl.text('name')
                .notNullable();
            tbl.text('yelp_url')
                .notNullable()
                .unique();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('businesses');
};
