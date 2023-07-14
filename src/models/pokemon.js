const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del modelo de Pokémon
const pokemonSchema = new Schema({
  name: String,
  internalName: String,
  type1: String,
  type2: String,
  baseStats: [Number],
  genderRate: String,
  growthRate: String,
  baseExp: Number,
  effortPoints: [Number],
  rareness: Number,
  happiness: Number,
  abilities: [String],
  hiddenAbility: String,
  moves: [{ level: Number, move: {type: mongoose.Schema.Types.ObjectId, ref: 'Move'} }],
  eggMoves: [String],
  compatibility: [String],
  stepsToHatch: Number,
  height: Number,
  weight: Number,
  color: String,
  habitat: String,
  kind: String,
  pokedex: String,
  battlerPlayerY: Number,
  battlerEnemyY: Number,
  battlerAltitude: Number,
  evolutions: [{ to: String, method: String, parameter: String }],
  evs: { type: Map, of: Number },
  ivs: { type: Map, of: Number },
  level: Number,
  movesLearned: [
    { 
      move: { type: mongoose.Schema.Types.ObjectId, ref: 'Move' }
    }
  ],
  nature: String
});

const Pokemon = mongoose.model('pokemon', pokemonSchema)

module.exports = Pokemon