const BBModel = require("../model/battleship.model")

exports.FindAll = async (req, res) => {
    try {
        const BBs = await BBModel.find();
        res.status(200).send(BBs);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.FindOneBB = async (req, res) => {
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
}

exports.EditOne = async (req, res) => {
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
}

exports.DeleteOne = async (req, res) => {
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
}

exports.Create = async (req, res) => {
    try {
        // DO NOT Give the ID to this manually
        let maxID = 0;
        const AllBB = await BBModel.find();
        maxID = AllBB.length + 1
        req.body._id = maxID;
        if (req.body.class == null || req.body.name == null) {
            res.status(422).send("");
            return;
        }
        const newBB = await BBModel.create(req.body);
        res.status(201).send(newBB);
    } catch (error) {
        res.status(400).send(error);
        if (error instanceof Error) {
            return error.message
        }
        return "Oh no"
    }
}
