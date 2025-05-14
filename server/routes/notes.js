const express = require("express");
const router = express.Router();
const { createNewNote, getAllNotes, deleteNote, updateNote } = require("../controllers/notesController");

// ================================================================================================

// Route    POST  /notes
// Action   Create New Note
router.post("/", createNewNote);

// ================================================================================================

// Route    GET  /notes
// Action   Read All Notes Belonging To Some User
router.get("/:userIdentifier", getAllNotes);

// ================================================================================================

// Route    DELETE  /notes/:id
// Action   Delete Note
router.delete("/:id", deleteNote);

// ================================================================================================

// Route    PATCH  /notes/:id
// Action   Update Note
router.patch("/:id", updateNote);

// ================================================================================================

module.exports = router;
