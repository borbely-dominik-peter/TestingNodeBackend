const mongoose = require('mongoose')

const BBSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
})

const TDM = mongoose.model('Todo', BBSchema)

module.exports = TDM