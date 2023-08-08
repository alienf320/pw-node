const mongoose = require('mongoose');

const pokemonAbilitySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  extraInfo: {
    type: String,
    required: false,
  },
});

const Ability = mongoose.model('Ability', pokemonAbilitySchema);

module.exports = Ability;
