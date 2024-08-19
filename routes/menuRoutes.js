const express = require('express');
const router = express.Router(); // Correctly invoke the Router
const Menu = require('./../models/menu_item');

// POST route to add a menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body; 
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('Menu item saved:', response);
        res.status(200).json(response);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all menu items from the database
router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log("Menu fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Parametrized API to fetch menu items by taste type
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
            const response = await Menu.find({ taste: tasteType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid taste Type" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
