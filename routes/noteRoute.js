const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const noteController = require('../controllers/noteController');

// Route to fetch notes
router.get('/get', authMiddleware, noteController.getNotes);
console.log('NoteController:', noteController); // Check if functions are imported correctly

// Get notes with status 'not completed'
router.get('/get-not-completed', authMiddleware, noteController.getNotCompletedNotes);

// Count notes with status 'not completed'
router.get('/count-completed', authMiddleware, noteController.countCompleted);

// Route to add a new note
router.post('/add', authMiddleware, noteController.addNote);

// Route to update a note
router.put('/update/:id', authMiddleware, noteController.updateNote);

// Route to delete a note
router.delete('/delete/:id', authMiddleware, noteController.deleteNote);



module.exports = router;
