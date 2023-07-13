require('./db/mongoose.js')
const express = require('express')
const pokemonRoutes = require('./routes/pokemonRoutes.js')
const typeRoutes = require('./routes/typesRoutes.js')
const moveRoutes = require('./routes/moveRoutes.js')
const trainerRoutes = require('./routes/trainerRoutes.js')
// require('./utils/fileReader.js')
// require('./utils/typesReader.js')
// require('./utils/trainersReader.js')
// require('./utils/movesReader.js')

const app = express()
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use('/pokemon', pokemonRoutes)
app.use('/types', typeRoutes)
app.use('/moves', moveRoutes)
app.use('/trainer', trainerRoutes)

app.listen(3000, () => {
  console.log('Server is running')
})

const Pokemon = require('./models/pokemon.js')

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

// main2()