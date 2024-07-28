const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure req.user is being set properly
    const notes = await Note.find({ userId });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Error fetching notes', error });
  }
};

const getNotCompletedNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure req.user is being set properly
    const notes = await Note.find({ userId, status: 'not completed' });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching not completed notes:', error);
    res.status(500).json({ message: 'Error fetching not completed notes', error });
  }
};

const addNote = async (req, res) => {
  const { description } = req.body;
  try {
    const userId = req.user.id; // Ensure req.user is being set properly
    const newNote = new Note({
      description,
      status: 'not completed',
      userId
    });
    await newNote.save();
    res.status(201).json({ note: newNote });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ message: 'Error adding note', error });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const userId = req.user.id; // Ensure req.user is being set properly
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId },
      { status },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Error updating note', error });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id; // Ensure req.user is being set properly
    await Note.findOneAndDelete({ _id: id, userId });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Error deleting note', error });
  }
};

const countCompleted = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure req.user is being set properly
    const count = await Note.countDocuments({ userId, status: 'completed' });
    res.json({ count });
  } catch (error) {
    console.error('Error counting completed notes:', error);
    res.status(500).json({ message: 'Error counting completed notes', error });
  }
};

module.exports = {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  getNotCompletedNotes,
  countCompleted
};
