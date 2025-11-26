const express = require('express');
const router = express.Router();
const BBModel = require('../model/battleship.model');
const CountryModel = require('../model/country.model');
const { Create } = require('../controller/BB.controller');

router.post('/battleships', BBModel.Create(req,res));

router.get('/battleships', async (req, res) => {
    try {
        const BBs = await BBModel.find();
        res.status(201).send(BBs);
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
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/countries', async (req, res) => {
    try {
        // DO NOT Give the ID to this manually
        let maxID = 0;
        const AllCountries = await CountryModel.find();
        maxID = AllCountries.length + 1
        req.body._id = maxID;
        const newCountry = await CountryModel.create(req.body);
        res.status(201).send(newCountry);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/countries', async (req, res) => {
    try {
        const Countries = await CountryModel.find();
        res.status(200).send(Countries);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/countries/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const country = await CountryModel.findOne({ _id: id });
        if (!country) {
            return res.status(404).send();
        }
        res.status(200).send(country);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/countries/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const country = await CountryModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!country) {
            return res.status(404).send();
        }
        res.status(200).send(country);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/countries/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const country = await CountryModel.findOneAndDelete({ _id: id });
        if (!country) {
            return res.status(404).send();
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
