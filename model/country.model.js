const mongoose = require('mongoose');
const Counter = require('./counter.model');

const CountrySchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    navy_founded: {
        type: Number
    },
    capital: {
        type: String
    },
    biggest_naval_battle: {
        type: String
    }
});

CountrySchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                'country_id',
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
});

const CountryModel = mongoose.model('Country', CountrySchema);

module.exports = CountryModel;
