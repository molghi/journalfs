const validator = require("validator");
const Note = require("../models/Note");

// ================================================================================================

async function createNewNote(req, res, next) {
    try {
        console.log(`createNewNote`);
        // Get data
        const { date, keywords, title, note } = req.body;
        console.log(req.body);

        // Sanitise and validate

        // Insert into db
        const noteToInsert = new Note({ dateFromInput: date, keywords, title, note }); // create a new instance of your model
        const savedNote = await noteToInsert.save(); // insert this document into collection

        res.status(200).json({ message: savedNote });
    } catch (error) {
        console.error(`💥 `, error);
        res.status(500).json({ message: "Error creating note" });
    }
}

// ================================================================================================

async function getAllNotes(req, res, next) {
    try {
        const allNotes = await Note.find();
        console.log(`allNotes`);
        console.log(allNotes);
        res.status(200).json({ message: allNotes });
    } catch (error) {
        console.error(`💥 `, error);
        res.status(500).json({ message: "Error reading notes" });
    }
}

// ================================================================================================

module.exports = { createNewNote, getAllNotes };
