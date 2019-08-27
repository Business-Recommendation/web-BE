
exports.up = function(knex) {
    return knex.schema
        .createTable('businesses-terms', tbl => {
            tbl.increments('id');
            tbl.integer('term_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('terms')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('business_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('businesses')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.float('highratingscore', 2)
                .unsigned()
                .notNullable();
            tbl.float('poorratingscore', 2)
                .unsigned()
                .notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('businesses-terms')
};
