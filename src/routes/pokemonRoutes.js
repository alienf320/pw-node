const express = require("express");
const Pokemon = require("../models/pokemon.js");

const router = new express.Router();

router.get("/", async (req, res) => {
  try {
    const pk = await Pokemon.find(req.query);
    if (!pk) {
      console.log("Que hacemo?");
      return res.status(404).send({ message: "No encontramos nada" });
    }

    res.send(pk.map((p) => p.name));
  } catch (error) {
    res.send(error);
  }
});

router.get("/full", async (req, res) => {
  try {
    const query = req.query;
    const exactMatch = query.exact === 'true'; // Verificar si el usuario quiere una búsqueda exacta

    const dbQuery = {};
    
    // Construir la consulta según sea búsqueda exacta o parcial
    Object.keys(query).forEach((key) => {
      if (key !== 'exact') {
        dbQuery[key] = exactMatch
          ? query[key]
          : new RegExp(query[key], "i"); // Utilizar expresión regular solo si no es una búsqueda exacta
      }
    });

    const pk = await Pokemon.find(dbQuery).populate("moves.move");

    if (pk.length === 0) {
      console.log("¿Qué hacemos?");
      return res.status(404).send({ message: "No encontramos nada" });
    }

    res.send(pk);
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;
