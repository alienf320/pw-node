const mongoose = require('mongoose')
const Move = require('./move')

const boxSchema = new mongoose.Schema({
  pokemons: [{
    pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' },
    level: Number,
    evs: { type: Map, of: Number },
    ivs: { type: Map, of: Number },
    nature: String, 
    ability: String,
    moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }]
  }]
});

const Box = mongoose.model('Box', boxSchema);

module.exports = Box