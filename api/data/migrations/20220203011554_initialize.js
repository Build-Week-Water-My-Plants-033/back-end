exports.up = async function (knex) {
  await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.string("phoneNumber", 30).notNullable();
      users.timestamps(false, true);
    })
    .createTable("species", (table) => {
      table.increments("species_id");
      table.string("species_name").notNullable().unique();
    })
    .createTable("plants", (table) => {
      table.increments("plant_id");
      table
        .integer("species_id")
        .unsigned()
        .notNullable()
        .references("species_id")
        .inTable("species")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("nickname");
      table.integer("frequency").notNullable;
      table.string("timeframe").notNullable;
      table.string("last_watered");
      table.string("next_water");
    });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("plants");
  await knex.schema.dropTableIfExists("species");
  await knex.schema.dropTableIfExists("users");
};
