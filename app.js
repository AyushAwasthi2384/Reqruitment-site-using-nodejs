// Backend code using Node.js and Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/recruitment', {useNewUrlParser: true, useUnifiedTopology: true});

// Define a schema for users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create a model for users
const User = mongoose.model('User', userSchema);

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({extended: true}));

// Serve the registration page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle the registration form submission
app.post('/register', (req, res) => {
    // Get the form data
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    // Validate the form data
    if (!name || !email || !password || !confirm_password) {
        res.send('Please fill in all the fields.');
    } else if (password !== confirm_password) {
        res.send('Passwords do not match.');
    } else {
        // Check if the email already exists in the database
        User.findOne({email: email}, (err, user) => {
            if (err) {
                res.send('An error occurred.');
            } else if (user) {
                res.send('This email is already registered.');
            } else {
                // Create a new user and save it to the database
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });
                newUser.save((err, user) => {
                    if (err) {
                        res.send('An error occurred.');
                    } else {
                        res.send('Registration successful.');
                    }
                });
            }
        });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
