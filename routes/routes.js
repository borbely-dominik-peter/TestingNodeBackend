const express = require('express');
const router = express.Router();
const BBModel = require('../model/battleship.model');
const CountryModel = require('../model/country.model');
const BBController = require('../controller/BB.controller');
const CountryController = require('../controller/country.controller');
const { Create } = require('../controller/BB.controller');
const req = require('express/lib/request');

router.post('/battleships', async (req,res) => {
    BBController.Create(req,res)
});

router.get('/battleships', async (req,res) => { BBController.FindAll(req,res) });

router.get('/battleships/:id', async(req,res) => { BBController.FindOne(req,res)});

router.patch('/battleships/:id', async(req,res) => {BBController.EditOne(req,res)});

router.delete('/battleships/:id', async(req,res) => {BBController.DeleteOne(req,res)});

router.post('/countries', async(req,res) => {CountryController.Create(req,res)});

router.get('/countries', async(req,res) => {CountryController.GetAll(req,res)});

router.get('/countries/:id', async(req,res) => {CountryController.GetOne(req,res)});

router.patch('/countries/:id', async (req, res) => {
   CountryController.Change(req,res)
});

router.delete('/countries/:id', async (req, res) => {
   CountryController.Delete(req,res)
});

module.exports = router;
