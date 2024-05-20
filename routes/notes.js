// Import express and call the Router method
const notes = require('express').Router();
// Destructure the modules we need from the 'fsUtils' file
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// let something = require('../db/db.json')

// Destructure the 'uuidv4' module so we can add individual id's for each note. 
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding a new note
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for deleting an existing note
// Note: I wasn't able to get this to work but I've detailed out the steps I think are close.
notes.delete('/api/notes/:id', (req, res) => {

  // Pull the specific note id from the 'params' part of the request to '/api/notes/:id'
    let noteID = req.params.id

    // Read all notes from the db.json file and save it to a variable
    let existingNotes = readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

    // Loop through each existing note
    for (let i = 0; i < existingNotes.length; i++) {

      // Check to see if the note id in the db.json file is the same as the one clicked on
      if (noteID === existingNotes[i].id) {
        // Use the splice method to remove the specific note with the associated id
        existingNotes.splice(i, 1);
        // Save the new list of notes as a 'stringified' file
        let noteJSON = JSON.stringify(existingNotes, null, 2);
        
        // Then write that new file to the location of './db/db.json'
        writeToFile('./db/db.json', noteJSON);
      }
    }
});

module.exports = notes;