const fs = require('fs')
const Type = require('../models/type.js')

fs.readFile('types.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split('\n');

  let currentType = {};
  for (let line of lines) {
    line = line.trim(); 

    if (line === '') {
      continue;
    }

    if(line.match(/\[/)) {
      console.log(line)
      Type.create(currentType)
      currentType = {};
      continue;
    }

    // Extraer la clave y el valor de la línea
    let [key, value] = line.split('=');
    value = value.toLowerCase()

    if (key === 'Name') {
      currentType.name = value;
    } else if(key === 'InternalName') {

    } else if(key === 'Weaknesses') {
      currentType.weaknesses = value.split(',').map(e => e.toLowerCase())
    } else if(key == 'Resistances') {
      currentType.resistances = value.split(',').map(e => e.toLowerCase())
    } else if(key === 'Immunities') {
      currentType.immunities = value.split(',').map(e => e.toLowerCase())
    }
    //console.log(currentType)
  }
});