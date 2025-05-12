const express = require("express");
const router = express.Router();
const { createNewNote, getAllNotes } = require("../controllers/notesController");

// ================================================================================================

// Route    POST  /notes
// Action   Create New Note
router.post("/", createNewNote);

// ================================================================================================

// Route    GET  /notes
// Action   Read All Notes
router.get("/", getAllNotes);

// ================================================================================================

module.exports = router;
