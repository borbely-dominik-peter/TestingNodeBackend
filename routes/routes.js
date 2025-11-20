const express = require('express');
const router = express.Router();
const BBModel = require('../model/battleship.model');

router.post('/battleships', async (req, res) => {
    try {
        const newBB = await BBModel.create(req.body);
        res.status(201).send(newBB);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/battleships', async (req, res) => {
    try {
        const BBs = await BBModel.find();
        res.status(200).send(BBs);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/battleships/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const battleship = await BBModel.findOne({ _id: id });
        if (!battleship) {
            return res.status(404).send();
        }
        res.status(200).send(battleship);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/battleships/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const battleship = await BBModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!battleship) {
            return res.status(404).send();
        }
        res.status(200).send(battleship);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/battleships/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const battleship = await BBModel.findOneAndDelete({ _id: id });
        if (!battleship) {
            return res.status(404).send();
        }
        res.status(200).send(battleship);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
