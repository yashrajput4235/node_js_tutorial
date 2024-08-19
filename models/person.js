const mongoose = require('mongoose');

// Define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,  // Fixed 'require' to 'required'
        unique: true
    }
});

// Create person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;  // Corrected 'moddule.exports' to 'module.exports'
