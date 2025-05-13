const express = require('express');  // Load Express library
const path = require('path'); // Load Path library

const app = express();               // Create an Express app
const port = process.env.PORT || 1337;  // Define the port

// Serve static files like CSS and images from "public/"
app.use(express.static('public'));

// Define what happens when someone visits the home page "/"
app.get('/', (req, res) => {
    //res.send('<h1>Hello from Express</h1>');  // Send basic HTML
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send HTML file for home page
});

// Start the server on the defined port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
