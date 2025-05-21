const express = require('express');  // Load Express library
const path = require('path'); // Load Path library

const app = express();               // Create an Express app
const port = process.env.PORT || 1337;  // Define the port

// Serve static files like CSS and images from "public/"
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Define what happens when someone visits the home page "/"
app.get('/', (req, res) => {
    //res.send('<h1>Hello from Express</h1>');  // Send basic HTML
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Send HTML file for home page
});

// Define what happens when someone visits the "/login" page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    // TODO: ADD AUTHENTICATION LOGIC HERE

    if (role == "player") {
        res.redirect('/player-dashboard');
    }
    else if (role == "dm") {
        res.redirect('/dm-dashboard');
    }
    else if (role == "admin") {
        res.redirect('/admin-dashboard');
    }
    else {
        res.status(400).send('Invalid role');
    }
})

app.get('/player-dashboard', (req, res) => {
    res.send('<h1>Player Dashboard</h1><p>Welcome, adventurer.</p>');
});

app.get('/dm-dashboard', (req, res) => {
    res.send('<h1>DM Dashboard</h1><p>Welcome, Dungeon Master.</p>');
});

app.get('/admin-dashboard', (req, res) => {
    res.send('<h1>Admin Dashboard</h1><p>Welcome, Admin.</p>');
});

// Start the server on the defined port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
