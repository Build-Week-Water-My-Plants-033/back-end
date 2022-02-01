exports.seed = async function (knex) {
    await knex('users').truncate()
    await knex('plants').truncate()
//     await knex('users').insert([
// //can add dummy user data if needed or wanted
//     ])
    await knex('plants').insert([
      {
        nickname: 'Bamboo',
        species: 'Phyllostachys aurea', 
        H2O_frequency: 'Once a day',
      },
      {
        nickname: 'Cactus',
        species: 'Cactaceae', 
        H2O_frequency: 'Twice a day',
      },
    ])
  }
  