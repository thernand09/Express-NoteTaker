// Import express and call the Router method
const router = require('express').Router();

// Import our modular router for /notes and use it
const notesRouter = require('./notes');
router.use('/notes', notesRouter);

// Export the modular routing app.
module.exports = router;