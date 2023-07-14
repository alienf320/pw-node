const mongoose = require('mongoose')

const boxSchema = new mongoose.Schema({
  pokemons: [{
    pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'pokemon' },
    level: Number,
    evs: { type: Map, of: Number },
    ivs: { type: Map, of: Number },
    nature: String, 
    ability: String
  }]
});

const Box = mongoose.model('Box', boxSchema);

module.exports = Box