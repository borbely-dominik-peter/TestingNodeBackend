const mongoose = require('mongoose');
const Counter = require('./counter.model');

const BBSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    Cid: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    commissioned: {
        type: Number
    },
    displacement_tons: {
        type: Number
    },
    status: {
        type: String
    }
});

/*BBSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                'battleship_id',
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this._id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});*/

const BBModel = mongoose.model('Battleship', BBSchema);

module.exports = BBModel;