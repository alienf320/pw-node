const express = require('express')
const Pokemon = require('../models/pokemon.js')

const router = new express.Router()

router.get('/', async (req, res) => {

  try {
    const pk = await Pokemon.find(req.query);
    if(!pk) {
      console.log("Que hacemo?")
      return res.status(404).send({message: "No encontramos nada"})
    }



    res.send(pk.map( p => p.name))
  } catch (error) {
    res.send(error)
  }
    
});

router.get('/full', async (req, res) => {

  try {
    const pk = await Pokemon.find(req.query).populate('moves.move');
    if(!pk) {
      console.log("Que hacemo?")
      return res.status(404).send({message: "No encontramos nada"})
    }
    res.send(pk)
  } catch (error) {
    res.send(error)
  }
    
});

module.exports = router