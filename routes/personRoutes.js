const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming request body contains person data
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Person saved:', response);
        res.status(200).json(response);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all persons from the database
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Persons fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Parametrized API to fetch persons by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid Work Type" });
        }
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a person
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from URL parameter
        const updatePersonData = req.body; // Updated data for the person
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run mongoose validation
        });
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE route to delete a person
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Data deleted");
        res.status(200).json({ message: "Person data deleted successfully" });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
