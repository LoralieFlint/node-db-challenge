exports.up = async function(knex) {
  await knex.schema
    .createTable("projects", table => {
      table.increments("id");
      table.string("project_name").notNullable();
      table.string("project_description");
      table.boolean("completed").defaultTo(false);
    })
    .createTable("resources", table => {
      table.increments();
      table
        .string("resource_name", 128)
        .notNullable()
        .unique();
      table.text("resource_description");
    });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("projects");
};
