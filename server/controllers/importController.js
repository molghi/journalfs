const validator = require("validator");
const Note = require("../models/Note");

// =======================================================================================

// IMPORT TO DATABASE

const importer = async (req, res, next) => {
    try {
        // Check for userIdentifier
        if (!req.body.userIdentifier) return res.status(400).json({ message: "No userIdentifier parameter" });

        // console.log(`Received notes through import:`, req.body.notes.length);

        // Sanitise and validate
        const notesSanitised = req.body.notes.map((noteObj) => {
            noteObj.dateInput = sanitizeInput(noteObj.dateInput);
            noteObj.keywords = sanitizeInput(noteObj.keywords);
            noteObj.title = sanitizeInput(noteObj.title);
            noteObj.note = sanitizeInput(noteObj.note);
            noteObj.time = sanitizeInput(noteObj.time);
            noteObj.dateModified = sanitizeInput(noteObj.dateModified);
            noteObj.id = sanitizeInput(noteObj.id, true);
            noteObj.dateCreated = sanitizeInput(noteObj.dateCreated);
            noteObj.userIdentifier = req.body.userIdentifier;
            return noteObj;
        });

        // Manipulate db --> if it doesn't find a note by my parameter, it creates it
        const operations = notesSanitised.map((note) => ({
            updateOne: {
                filter: { id: note.id },
                update: { $set: note },
                upsert: true,
            },
        }));
        // Perform bulk update: Create new documents if absent, or update existing ones
        await Note.bulkWrite(operations);

        res.status(200).json({ message: "Notes imported successfully" });
    } catch (err) {
        console.error(`💥 ERROR`, err);
        res.status(500).json({ message: "Error importing notes" });
    }
};

// =======================================================================================

// Minor helper function

function sanitizeInput(input, idFlag) {
    if (idFlag && typeof input === "number") return input; // special check for 'id'
    if (typeof input !== "string") return "";
    return validator.escape(input.trim());
}

// =======================================================================================

module.exports = importer;
