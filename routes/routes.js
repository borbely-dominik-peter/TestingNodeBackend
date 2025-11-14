const express = require('express');
const router = express.Router();
const BBModel = require('../model/todo.model');
// const BBController = require("../controller/todo.controller")

// Create a new BB
router.post('/battleships', async (req, res) => {
    try {
        const newBB = await BBModel.create(req.body);
        res.status(201).send(newBB);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all Ships
router.get('/battleships', async (req, res) => {
    try {
        const BBs = await BBModel.find();
        res.status(200).send(BBs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get 1 Ship
router.get('/battleships/:id', async (req, res) => {
    try {
        const battleship = await BBModel.findById(req.params.id);
        if (!battleship) {
            return res.status(404).send();
        }
        res.status(200).send(battleship);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a ship
router.patch('/battleships/:id', async (req, res) => {
    try {
        const battleship = await BBModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!battleship) {
            return res.status(404).send();
        }
        res.status(200).send(battleship);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a ship
router.delete('/battleships/:id', async (req, res) => {
    try {
        const battleship = await BBModel.findByIdAndDelete(req.params.id);
        if (!battleship) {
            return res.status(404).send();
        }
        res.status(200).send(battleship);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
