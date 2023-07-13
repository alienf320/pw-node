const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  displayName: {
    type: String,
  },
  power: {
    type: Number,

  },
  accuracy: {
    type: Number,

  },
  type: {
    type: String,
  },
  category: {
    type: String,

  },
  pp: {
    type: Number,

  },
  target: {
    type: Number,

  },
  effectChance: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  }
});

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;
