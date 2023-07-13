const fs = require('fs')
const Trainer = require('../models/trainer.js')

fs.readFile('trainers.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error al leer el archivo:', err);
    return;
  }

  // Dividir el contenido del archivo en líneas
  const lines = data.split('\n');

  // Variables para almacenar los datos del entrenador actual
  let currentType, currentName, currentTeamSize, currentPokemon;
  const trainers = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLocaleLowerCase().trim();

    if (line === '#-------------------') {
      // Si se encuentra esta línea, se completa la información del entrenador actual y se crea un nuevo objeto Trainer
      if (currentType && currentName && currentTeamSize && currentPokemon) {
        const trainer = new Trainer({
          type: currentType,
          name: currentName,
          teamSize: currentTeamSize,
          team: currentPokemon
        });

        trainers.push(trainer);
        await Trainer.create(trainer)
      }

      // Reiniciar las variables para el próximo entrenador
      currentType = null;
      currentName = null;
      currentTeamSize = null;
      currentPokemon = null;
    } else if (line) {
      // Analizar la línea actual según su posición
      if (!currentType) {
        currentType = line.toLocaleLowerCase();
      } else if (!currentName) {
        currentName = line.toLocaleLowerCase();
      } else if (!currentTeamSize) {
        const arr = line.split(',').map(e => e.toLocaleLowerCase());
        if(arr.length > 0) {
          currentTeamSize = parseInt(arr[0]);
        } else {
          currentTeamSize = parseInt(line);
        }
      } else {
        // Si se llega a esta parte, la línea actual contiene información de un Pokémon
        const pokemonData = line.split(',').map(e => e.toLocaleLowerCase());
        const pokemon = {
          name: pokemonData[0].toLocaleLowerCase(),
          level: parseInt(pokemonData[1]),
          item: pokemonData[2]?.toLocaleLowerCase(),
          moves: pokemonData.slice(3)
        };

        if (!currentPokemon) {
          currentPokemon = [];
        }

        currentPokemon.push(pokemon);
      }
    }
  }

  // Imprimir los entrenadores
  //console.log(trainers.map( t => t.team));
});