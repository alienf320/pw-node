const fs = require('fs')
const Pokemon = require('../models/pokemon.js')
const Move = require('../models/move.js')

fs.readFile('pokemon.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split('\n');

  let currentPokemon = {};
  for (let line of lines) {
    line = line.trim(); 

    if (line === '') {
      currentPokemon = {};
      continue;
    }

    if(line.match(/\[/)) {
      Pokemon.create(currentPokemon)
      currentPokemon = {};
      continue;
    }

    // Extraer la clave y el valor de la línea
    let [key, value] = line.split('=');
    value = value.toLowerCase()
    // Almacenar el valor en el objeto del Pokémon
    if (key === 'Name') {
      currentPokemon.name = value;
    } else if (key === 'InternalName') {
      currentPokemon.internalName = value;
    } else if (key === 'Type1') {
      currentPokemon.type1 = value;
    } else if (key === 'Type2') {
      currentPokemon.type2 = value;
    } else if (key === 'BaseStats') {
      currentPokemon.baseStats = value.split(',').map(Number);
    } else if (key === 'GenderRate') {
      currentPokemon.genderRate = value;
    } else if (key === 'GrowthRate') {
      currentPokemon.growthRate = value;
    } else if (key === 'BaseEXP') {
      currentPokemon.baseExp = Number(value);
    } else if (key === 'EffortPoints') {
      currentPokemon.effortPoints = value.split(',').map(Number);
    } else if (key === 'Rareness') {
      currentPokemon.rareness = Number(value);
    } else if (key === 'Happiness') {
      currentPokemon.happiness = Number(value);
    } else if (key === 'Abilities') {
      currentPokemon.abilities = value.split(',');
    } else if (key === 'HiddenAbility') {
      currentPokemon.hiddenAbility = value;
    } else if (key === 'Moves') {
      const moveData = value.split(',');
      currentPokemon.moves = [];
      for (let i = 0; i < moveData.length; i += 2) {
        const level = Number(moveData[i]);
        try {
          const move = await Move.findOne({name: moveData[i+1]})          
          if(move) {
            currentPokemon.moves.push({ level, move });
          }
        } catch (error) {
          
        }
        //const move = moveData[i + 1];
      }
    } else if (key === 'EggMoves') {
      currentPokemon.eggMoves = value.split(',');
    } else if (key === 'Compatibility') {
      currentPokemon.compatibility = value.split(',');
    } else if (key === 'StepsToHatch') {
      currentPokemon.stepsToHatch = Number(value);
    } else if (key === 'Height') {
      currentPokemon.height = isNaN(Number(value)) ? 0 : Number(value);
    } else if (key === 'Weight') {
      currentPokemon.weight = Number(value);
    } else if (key === 'Color') {
      currentPokemon.color = value;
    } else if (key === 'Habitat') {
      currentPokemon.habitat = value;
    } else if (key === 'Kind') {
      currentPokemon.kind = value;
    } else if (key === 'Pokedex') {
      currentPokemon.pokedex = value;
    } else if (key === 'BattlerPlayerY') {
      currentPokemon.battlerPlayerY = Number(value);
    } else if (key === 'BattlerEnemyY') {
      currentPokemon.battlerEnemyY = Number(value);
    } else if (key === 'BattlerAltitude') {
      currentPokemon.battlerAltitude = Number(value);
    } else if (key === 'Evolutions') {
      const evolutionData = value.split(',');
      currentPokemon.evolutions = [];
      for (let i = 0; i < evolutionData.length; i += 3) {
        const to = evolutionData[i];
        const method = evolutionData[i + 1];
        const parameter = evolutionData[i + 2];
        currentPokemon.evolutions.push({ to, method, parameter });
      }
    }
  }
});