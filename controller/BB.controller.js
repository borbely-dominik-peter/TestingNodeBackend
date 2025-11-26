const BBModel = require("../model/todo.model")

exports.Create = async (req, res) => {
    try {
        // DO NOT Give the ID to this manually
        let maxID = 0;
        const AllBB = await BBModel.find();
        maxID = AllBB.length + 1
        req.body._id = maxID;
        const newBB = await BBModel.create(req.body);
        res.status(201).send(newBB);
    } catch (error) {
        res.status(400).send(error);
    }
}

/*exports.CreateBB = (req, res, next) => {
    const data = BBModel.create(req.body) // mongoose built-in, gives back post data
    res.status(201).json(data); // sets status code
