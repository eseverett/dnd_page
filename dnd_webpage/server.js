const express = require('express');  // Load Express library
const path = require('path'); // Load Path library
const userStore = require('./users.js'); // Load user store module

const app = express();               // Create an Express app
const port = process.env.PORT || 1337;  // Define the port

// Serve static files like CSS and images from "public/"
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

userStore.loadUsersFromCSV().then(() => {
    console.log('User data loaded from CSV.');
})

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
    const users = userStore.getUsers();

    const user = users.find(u =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (!user) {
        return res.send(`
            <h1>Login Failed</h1>
            <p>Invalid username, password, or role.</p>
            <a href="/login">Try again</a>
        `);
    }

    if (role === 'player') {
        res.redirect('/player-dashboard');
    } else if (role === 'dm') {
        res.redirect('/dm-dashboard');
    } else if (role === 'admin') {
        res.redirect('/admin-dashboard');
    } else {
        res.status(400).send('Unknown role');
    }
});

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
