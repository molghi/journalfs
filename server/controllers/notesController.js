const validator = require("validator");
const Note = require("../models/Note");
const DOMPurify = require("dompurify");

// ================================================================================================

// CREATE A NEW NOTE belonging to userIdentifier

async function createNewNote(req, res, next) {
    try {
        // Get data from request body
        const { date, keywords, title, note, userIdentifier } = req.body;

        // Check for userIdentifier
        if (!userIdentifier) return res.status(400).json({ message: "No userIdentifier parameter" });

        // Sanitise and validate
        const sanitizedData = {
            date: sanitizeInput(date),
            keywords: sanitizeInput(keywords),
            title: sanitizeInput(title),
            note: sanitizeInput(note),
        };

        // Insert into db
        const noteToInsert = new Note({
            dateInput: sanitizedData.date,
            keywords: sanitizedData.keywords,
            title: sanitizedData.title,
            note: sanitizedData.note,
            userIdentifier,
        }); // create a new instance of your model
        const savedNote = await noteToInsert.save(); // insert this document into collection

        res.status(200).json({ message: savedNote });
    } catch (error) {
        console.error(`💥 `, error);
        res.status(500).json({ message: "Error creating note" });
    }
}

// Minor helper function
function sanitizeInput(input) {
    if (typeof input !== "string") return "";
    return validator.escape(input.trim());
}

// ================================================================================================

// READ/GET ALL NOTES belonging to userIdentifier

async function getAllNotes(req, res, next) {
    try {
        // Check for userIdentifier
        if (!req.params.userIdentifier) return res.status(400).json({ message: "No userIdentifier parameter" });

        // Get all notes belonging to userIdentifier
        const allNotes = await Note.find({ userIdentifier: req.params.userIdentifier });
        // console.log(`user's notes in db:`, allNotes.length);

        // Return them
        res.status(200).json({ message: allNotes });
    } catch (error) {
        console.error(`💥 `, error);
        res.status(500).json({ message: "Error reading notes" });
    }
}

// ================================================================================================

// DELETE ONE NOTE belonging to userIdentifier

async function deleteNote(req, res, next) {
    try {
        // Check for userIdentifier
        if (!req.body.userIdentifier) return res.status(400).json({ message: "No userIdentifier parameter" });

        // Validate, sanitise
        const idCleaned = validator.escape(req.params.id.trim());
        const isCleanNumber = /^\d+$/.test(req.params.id.trim());
        if (!isCleanNumber) return res.status(400).json({ message: "Incorrect note id" });

        // Query db to delete
        const resp = await Note.findOneAndDelete({ id: idCleaned, userIdentifier: req.body.userIdentifier });

        res.status(200).json({ deletedItem: resp, message: "Note deleted successfully" });
    } catch (error) {
        console.error(`💥 `, error);
        res.status(500).json({ message: "Error deleting note" });
    }
}

// ================================================================================================

// UPDATE ONE NOTE

async function updateNote(req, res, next) {
    try {
        if (!req.body.userIdentifier) return res.status(400).json({ message: "No userIdentifier parameter" });

        if (req.body.title) return updateNoteTitle(req, res, next);
        if (req.body.note) return updateNoteBody(req, res, next);
        if (req.body.keywords) return updateNoteKeywords(req, res, next);
        // res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        console.error(`💥 `, error);
        res.status(500).json({ message: "Error updating note" });
    }
}

// ================================================================================================

// Not a middleware, just a helper function (1)

async function updateNoteTitle(req, res, next) {
    try {
        // Validate, sanitise title
        const titleCleaned = validator.escape(req.body.title.trim());
        const idCleaned = validator.escape(req.params.id.trim());

        // Update the db and store updated doc
        const resp = await Note.findOneAndUpdate(
            { id: idCleaned, userIdentifier: req.body.userIdentifier },
            { $set: { title: titleCleaned, dateModified: Date.now() } },
            { new: true }
        );

        // Return it
        res.status(200).json({ status: "Note title updated successfully", message: resp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating note title" });
    }
}

// ================================================================================================

// Not a middleware, just a helper function (2)

async function updateNoteBody(req, res, next) {
    try {
        // Validate, sanitise note body
        const idCleaned = validator.escape(req.params.id.trim());
        const noteBodyCleaned = validator.escape(req.body.note.trim());

        // Update the db and store updated doc
        const resp = await Note.findOneAndUpdate(
            { id: idCleaned, userIdentifier: req.body.userIdentifier },
            { $set: { note: noteBodyCleaned, dateModified: Date.now() } },
            { new: true }
        );

        // Return it
        res.status(200).json({ status: "Note body updated successfully", message: resp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating note body" });
    }
}

// ================================================================================================

// Not a middleware, just a helper function (3)

async function updateNoteKeywords(req, res, next) {
    try {
        // Validate, sanitise keywords
        const idCleaned = validator.escape(req.params.id.trim());
        const keywordsCleaned = validator.escape(req.body.keywords.trim());

        // Update the db and store updated doc
        const resp = await Note.findOneAndUpdate(
            { id: idCleaned, userIdentifier: req.body.userIdentifier },
            { $set: { keywords: keywordsCleaned, dateModified: Date.now() } },
            { new: true }
        );

        // Return it
        res.status(200).json({ status: "Note keywords updated successfully", message: resp });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating note keywords" });
    }
}

// ================================================================================================

module.exports = { createNewNote, getAllNotes, deleteNote, updateNote };
