const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del modelo de Pokémon
const typeSchema = new Schema({
  name: String,
  weaknesses: [String],
  resistances: [String],
  immunities: [String]
});

const Type = mongoose.model('type', typeSchema)

module.exports = Type