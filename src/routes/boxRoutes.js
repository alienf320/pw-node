const express = require('express')
const Box = require('../models/box.js')
const Pokemon = require('../models/pokemon.js')

const router = new express.Router()

router.post('/', async (req, res) => {
  try {
    let box = await Box.findOne();
    if (!box) {
      box = new Box();
    }

    const pokemon = await Pokemon.findOne({ internalName: req.body.displayName });
    if (!pokemon) {
      return res.status(404).send('Pokemon not found.');
    }

    const newPokemon = {
      pokemon: pokemon._id,
      level: req.body.level || 1,
      ability: req.body.ability || '',
      evs: req.body.evs || {},
      ivs: req.body.ivs || {},
      nature: req.body.nature || '',
    };

    console.log('pokemon', newPokemon)
    box.pokemons.push(newPokemon);
    await box.save();
    const boxFull = await box.populate('pokemons.pokemon')
    console.log(boxFull.pokemons)
    res.send(boxFull.pokemons);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const box = await Box.findOne()
    if(!box) {
      return res.send()
    }
    let boxFull = await box.populate('pokemons.pokemon')
    boxFull = await box.populate('pokemons.moves');
    console.log('Box - GET ------------------')
    console.log(boxFull.pokemons.map(p => p.moves))
    res.send(boxFull.pokemons)    
  } catch (error) {
    console.error(error)
    res.status(501).send(error)    
  }
})

router.patch('/', async (req, res) => {
  //console.log('PATCH', req.body);
  try {
    const pokemonId = req.body._id;
    let moves = [];
    const updatedPokemon = {};

    if(req.body.moves) {
      //console.log('moves', req.body.moves)
      moves = req.body.moves.map( m => m._id)
      updatedPokemon['pokemons.$.moves'] = moves
      //console.log('moves', moves)
    }
    
    if (req.body.level) {
      updatedPokemon['pokemons.$.level'] = req.body.level;
    }
    if (req.body.ability) {
      updatedPokemon['pokemons.$.ability'] = req.body.ability;
    }
    if (req.body.nature) {
      updatedPokemon['pokemons.$.nature'] = req.body.nature;
    }
    if (req.body.evs) {
      updatedPokemon['pokemons.$.evs'] = req.body.evs;
    }
    if (req.body.ivs) {
      updatedPokemon['pokemons.$.ivs'] = req.body.ivs;
    }
    
    const pk = await Box.findOneAndUpdate(
      { 'pokemons._id': pokemonId },
      { $set: updatedPokemon },
      { new: true }
    );

    let boxFull = await pk.populate('pokemons.pokemon');
    boxFull = await pk.populate('pokemons.moves');
    res.send(boxFull.pokemons);
  } catch (error) {
    console.error(error);
    res.status(502).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pokemonId = req.params.id;
    const box = await Box.findOne();

    if (!box) {
      return res.status(404).send('Box not found.');
    }

    box.pokemons = box.pokemons.filter(pokemon => pokemon._id.toString() !== pokemonId);
    await box.save();

    const boxFull = await box.populate('pokemons.pokemon');
    res.send(boxFull.pokemons);
  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
});

module.exports = router