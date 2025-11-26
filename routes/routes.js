const express = require('express');
const router = express.Router();
const BBModel = require('../model/battleship.model');
const CountryModel = require('../model/country.model');
const BBController = require('../controller/BB.controller');
const CountryController = require('../controller/Country.controller');
const { Create } = require('../controller/BB.controller');

router.post('/battleships', BBController.Create(req,res));

router.get('/battleships', BBController.FindAll(req,res));

router.get('/battleships/:id', BBController.FindOne(req,res));

router.patch('/battleships/:id', BBController.EditOne(req,res));

router.delete('/battleships/:id', BBController.DeleteOne(req,res));

router.post('/countries', CountryController.Create(req,res));

router.get('/countries', CountryController.GetAll(req,res));

router.get('/countries/:id', CountryController.GetOne(req,res));

router.patch('/countries/:id', CountryController.Change(req,res));

router.delete('/countries/:id', CountryController.Change(req,res));

module.exports = router;
