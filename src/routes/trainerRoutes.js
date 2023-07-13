const express = require('express');
const Trainer = require('../models/trainer.js');

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    const searchQuery = {};
    for (const key in req.query) {
      searchQuery[key] = { $regex: new RegExp(req.query[key], 'i') };
    }
    console.log(searchQuery)

    const trainers = await Trainer.find(searchQuery);
    if (trainers.length === 0) {
      return res.status(404).send({ message: 'Trainers not found' });
    }

    res.status(200).send(trainers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router