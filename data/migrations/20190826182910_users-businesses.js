
exports.up = function(knex) {
    return knex.schema
        .createTable('users-businesses', tbl => {
            tbl.increments('id');
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('business_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('businesses')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.text('yelp_url')
                .notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users-businesses')
};
