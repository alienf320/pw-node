const fs = require('fs')
const Ability = require('../models/ability.js')

const fileData = fs.readFileSync("abilities.txt", 'utf8');
const lines = fileData.split('\n');

let array = [];

for (const line of lines) {
  if (line.trim() !== '') {
    const abilityData = line.toLocaleLowerCase().split(/,(?=(?:[^"]|"[^"]*")*$)/);
    
    //console.log(abilityData)
    const ability = {
      id: parseInt(abilityData[0]),
      name: abilityData[1],
      displayName: abilityData[2],
      description: abilityData[3]?.trim()
    };
    
    // Ability.create(ability)
    array.push(ability)

  }
}

fs.writeFileSync('abilitiesJSON.txt', JSON.stringify(array))