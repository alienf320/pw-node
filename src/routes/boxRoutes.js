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
    const boxFull = await box.populate('pokemons.pokemon')
    res.send(boxFull.pokemons)    
  } catch (error) {
    res.status(501).send(error)    
  }
})

module.exports = router