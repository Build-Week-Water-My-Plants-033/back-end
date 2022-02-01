exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments(),
      users.string("username").notNullable().unique(),
      users.string("phoneNumber").notNullable(),
      users.string("password").notNullable()
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id')
      plants.string('nickname', 200).notNullable()
      plants.string('species', 200).notNullable()
      plants.string('H2O_frequency', 200).notNullable()
    }) 
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('plants')
}
