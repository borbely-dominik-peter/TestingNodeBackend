const BBModel = require("../model/todo.model")

exports.createTodo = (req, res, next) => {
    const data = BBModel.create(req.body) // mongoose built-in, gives back post data
    res.status(201).json(data); // sets status code
}