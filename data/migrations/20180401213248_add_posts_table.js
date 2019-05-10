exports.up = function(knex) {
  return knex.schema.createTable('comments', function(tbl) {
      tbl.increments();
      tbl
        .string('text')
        .notNullable()
      tbl.text('username').notNullable();
      tbl.timestamps(true, true);

      tbl
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};
