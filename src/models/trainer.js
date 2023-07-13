const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del modelo de Pokémon
const trainerSchema = new Schema({
  type: String,
  name: String,
  teamSize: Number,
  team: [{
    name: String,
    level: Number,
    item: String,
    moves: [String]
  }]
});

const Trainer = mongoose.model('trainer', trainerSchema)

module.exports = Trainer