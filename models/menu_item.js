const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour']
    },
    is_Drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String], // Corrected to [String] with an uppercase "S"
        default: [],
    },
    sales: {
        type: Number,
        default: 0
    }
});

// Create menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu; // Export the Menu model
