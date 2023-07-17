require('./db/mongoose.js')
const express = require('express')
const pokemonRoutes = require('./routes/pokemonRoutes.js')
const typeRoutes = require('./routes/typesRoutes.js')
const moveRoutes = require('./routes/moveRoutes.js')
const trainerRoutes = require('./routes/trainerRoutes.js')
const boxRoutes = require('./routes/boxRoutes.js')

const Move = require('./models/move.js')
const Pokemon = require('./models/pokemon.js')
// require('./utils/fileReader.js')
// require('./utils/typesReader.js')
// require('./utils/trainersReader.js')
// require('./utils/movesReader.js')

const app = express()
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/pokemon', pokemonRoutes)
app.use('/types', typeRoutes)
app.use('/moves', moveRoutes)
app.use('/trainer', trainerRoutes)
app.use('/box', boxRoutes)

app.listen(3000, () => {
  console.log('Server is running')
})

// async function main() {
//   const data = await Pokemon.find({name: 'charmander'}).populate('moves.move', 'name -_id').select('moves')
//   console.log(JSON.stringify(data))
// }

// async function main2() {
//   Pokemon.findOne({ name: 'charmander' })
//     .populate('moves.move')  // Cargar los detalles completos de los movimientos relacionados
//     .then(pokemon => {
//       if (pokemon) {
//         console.log('Movimientos de Pikachu:');
//         pokemon.moves.forEach(move => {
//           console.log('Nivel:', move.level);
//           console.log('Nombre:', move.move.name);
//           console.log('Display Name:', move.move.displayName);
//           console.log('Type:', move.move.type);
//           console.log('Power:', move.move.power);
//           console.log('---');
//         });
//       } else {
//         console.log('Pikachu no encontrado.');
//       }
//     })
//     .catch(error => {
//       console.error('Error al buscar Pikachu:', error);
//     });
// }

// const fs = require('fs');

// async function main3() {
//   try {
//     const moves = await Move.find({}).select('name -_id');
//     const moveNames = moves.map(move => move.name);
    
//     // Crear una cadena de texto con los nombres de los movimientos separados por salto de línea
//     const moveNamesText = '"' + moveNames.join('","') + '"';
    
//     // Escribir la cadena de texto en un archivo
//     fs.writeFileSync('movements.txt', moveNamesText);
    
//     console.log('Archivo movements.txt creado exitosamente.');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// const fs = require('fs');

// async function main3() {
//   try {
//     const pk = await Pokemon.find({});
//     const pkNames = pk.map(pk => pk.internalName);
    
//     // Crear una cadena de texto con los nombres de los movimientos separados por salto de línea
//     const moveNamesText = '"' + pkNames.join('","') + '"';
    
//     // Escribir la cadena de texto en un archivo
//     fs.writeFileSync('pokemons.txt', moveNamesText);
    
//     console.log('Archivo movements.txt creado exitosamente.');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// const Type = require('./models/type.js')

// const fs = require('fs');
// const allTypes = [
//   "fighting",
//   "???",
//   "grass",
//   "electric",
//   "fire",
//   "ice",
//   "dragon",
//   "dark",
//   "water",
//   "wood",
//   "magma",
//   "steam",
//   "wind",
//   "psychic",
//   "tech",
//   "rubber",
//   "fear",
//   "magic",
//   "light",
//   "cosmic",
//   "fairy",
//   "food",
//   "zombie",
//   "nuclear",
//   "virus",
//   "cyber",
//   "glass",
//   "paper",
//   "fabric",
//   "chaos",
//   "divine",
//   "time",
//   "paint",
//   "crystal",
//   "meme",
//   "blood",
//   "greasy",
//   "sound",
//   "ogre",
//   "shadow",
//   "void",
//   "wack",
//   "bone",
//   "plastic",
//   "heart",
//   "normal",
//   "flying",
//   "poison",
//   "ground",
//   "rock",
//   "bug",
//   "ghost",
//   "steel"
// ]

// async function main3() {
//   const tabla = {};
//   const promises = [];

//   for (let type of allTypes) {
//     promises.push(llenarTabla(type));
//   }

//   try {
//     const results = await Promise.all(promises);
//     for (let i = 0; i < allTypes.length; i++) {
//       const type1 = allTypes[i];
//       const result = results[i];
//       tabla[type1] = result;
//     }

//     //console.log(tabla);
//     fs.writeFileSync('typesTable.txt', JSON.stringify(tabla));

//   } catch (error) {
//     console.error(error);
//     // Manejar el error aquí si es necesario
//   }
// }

// async function llenarTabla(type1) {
//   const allTypesObj = {};
//   for (const type of allTypes) {
//     allTypesObj[type] = 1;
//   }

//   let ws = []
//   let rs = []
//   let is = []

//   try {
//     const t1 = await Type.findOne({name: type1})
//     ws = t1.weaknesses
//     rs = t1.resistances
//     is = t1.immunities
    
//     ws.forEach( w => allTypesObj[w] = allTypesObj[w]*2)
//     rs.forEach( r => allTypesObj[r] = allTypesObj[r]/2)
//     is.forEach( i => allTypesObj[i] = 0)

//     return allTypesObj

//   } catch (error) {
//     res.status(409).send(error)    
//   }  
// }

// main3();