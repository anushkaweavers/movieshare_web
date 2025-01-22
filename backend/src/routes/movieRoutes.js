const express = require('express');
const { getMovies } = require('../controllers/tmdbController'); // Adjust path if needed
const router = express.Router();

// This will handle the dynamic endpoint passed to /movies/:endpoint
router.get('/:endpoint', getMovies);

module.exports = router;
