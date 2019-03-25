exports.up = function(knex) {
  return knex.schema.createTable('posts', function(posts) {
    posts.increments();

    posts.text('title').notNullable();
    posts.text('contents').notNullable();

    posts.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
