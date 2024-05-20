// Add dependencies and necessary file routes
const express = require(`express`);
const path = require('path');
const api = require('./routes/index.js');

// Set the port number and create an app variable set to the value of express()
const PORT = 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// GET route for the notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  );

// GET route for the homepage (which is all other routes)
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

// Call the listen() method to listen for incoming connections on our specified port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );