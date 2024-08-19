const express = require('express');
const db = require('./db'); // Import the MongoDB connection
const Person = require('./models/person');
const Menu = require('./models/menu_item');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // Store JSON data in req.body

// Define the root route
app.get('/', (req, res) => {
    res.send("Welcome to my hotel...List of menu here");
});

// Import router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
