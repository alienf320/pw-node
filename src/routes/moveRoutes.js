const express = require('express')
const Move = require('../models/move.js')

const router = new express.Router()

router.get('/', async (req, res) => {

  try {
    const m = await Move.find(req.query);
    if(!m) {
      console.log("Que hacemo?")
      return res.status(404).send({message: "No encontramos nada"})
    }

    res.send(m)
  } catch (error) {
    res.send(error)
  }    
});


module.exports = router