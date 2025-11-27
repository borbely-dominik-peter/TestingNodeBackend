const CountryModel = require("../model/country.model");

exports.Create = async (req, res) => {
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
}

exports.GetAll = async (req, res) => {
    try {
        const Countries = await CountryModel.find();
        res.status(200).send(Countries);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.GetOne = async (req, res) => {
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
}

exports.Change = async (req, res) => {
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
}

exports.Delete = async (req, res) => {
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
}