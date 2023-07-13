const express = require('express')
const Type = require('../models/type.js')

const router = new express.Router();
const allTypes = [
  "fighting",
  "???",
  "grass",
  "electric",
  "fire",
  "ice",
  "dragon",
  "dark",
  "water",
  "wood",
  "magma",
  "steam",
  "wind",
  "psychic",
  "tech",
  "rubber",
  "fear",
  "magic",
  "light",
  "cosmic",
  "fairy",
  "food",
  "zombie",
  "nuclear",
  "virus",
  "cyber",
  "glass",
  "paper",
  "fabric",
  "chaos",
  "divine",
  "time",
  "paint",
  "crystal",
  "meme",
  "blood",
  "greasy",
  "sound",
  "ogre",
  "shadow",
  "void",
  "wack",
  "bone",
  "plastic",
  "heart",
  "normal",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel"
]

router.get('/', async (req, res) => {
  const allTypesObj = {};
  for (const type of allTypes) {
    allTypesObj[type] = 1;
  }

  let ws = []
  let rs = []
  let is = []
  const {type1, type2} = req.query

  try {
    const t1 = await Type.findOne({name: type1})
    ws = t1.weaknesses
    rs = t1.resistances
    is = t1.immunities
    
    if(type2) {
      const t2 = await Type.findOne({name: type2})
      ws = ws.concat(t2.weaknesses)
      rs = rs.concat(t2.resistances)      
      is = is.concat(t2.immunities)
    }    
    
    ws.forEach( w => allTypesObj[w] = allTypesObj[w]*2)
    rs.forEach( r => allTypesObj[r] = allTypesObj[r]/2)
    is.forEach( i => allTypesObj[i] = 0)

    const weak = [];
    const superWeak = [];
    const resistance = [];
    const superResistance = [];
    const immunities = []
  
    for (const key in allTypesObj) {
      if (allTypesObj.hasOwnProperty(key)) {
        switch (allTypesObj[key]) {
          case 4:
            superWeak.push(key)
            break;
          case 2:
            weak.push(key)
            break;
          case 0.5:
            resistance.push(key)
            break;
          case 0.25:
            superResistance.push(key)
            break;
          case 0:
            immunities.push(key)          
        }
      }
    }

    res.send({superWeak, weak, resistance, superResistance, immunities})

  } catch (error) {
    res.status(409).send(error)    
  }   
})

module.exports = router