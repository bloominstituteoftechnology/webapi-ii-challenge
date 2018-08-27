exports.up = function(knex, Promise) {
  console.log('creating posts table');

  return knex.schema.createTable('posts', function(posts) {
    posts.increments();

    posts.string('title', 255).notNullable();
    posts.text('contents').notNullable();

    posts.timestamps(true, true);

    console.log('posts table created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
