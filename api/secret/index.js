const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 8;

const SECRET =
  process.env.SECRET ||
  "aspodhuifhuioohgeraouiorwggjbnasdfgvjsfbvaloaswqqzpfmnwejkvys";

module.exports = { BCRYPT_ROUNDS, SECRET };
