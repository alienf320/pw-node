const fs = require('fs')
const Move = require('../models/move.js')

const fileData = fs.readFileSync("moves.txt", 'utf8');
const lines = fileData.split('\n');

for (const line of lines) {
  if (line.trim() !== '') {
    const moveData = line.toLocaleLowerCase().split(/,(?=(?:[^"]|"[^"]*")*$)/);
    
    //console.log(moveData)
    const move = {
      id: parseInt(moveData[0]),
      name: moveData[1],
      displayName: moveData[2],
      power: isNaN(parseInt(moveData[4])) ? 0 : parseInt(moveData[4]),
      accuracy: isNaN(parseInt(moveData[7])) ? 0 : parseInt(moveData[7]),
      type: moveData[5],
      category: moveData[6],
      pp: isNaN(parseInt(moveData[8])) ? 0 : parseInt(moveData[8]),
      effectChance: isNaN(parseInt(moveData[9])) ? 0 : parseInt(moveData[9]),
      target: isNaN(parseInt(moveData[11])) ? 0 : parseInt(moveData[11]),
      description: moveData[moveData.length - 1]?.trim()
    };
    
    Move.create(move)
  }
}