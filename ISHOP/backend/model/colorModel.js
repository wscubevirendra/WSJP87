const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hexcode: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

const ColorModel = mongoose.model('Color', colorSchema);

module.exports = ColorModel;