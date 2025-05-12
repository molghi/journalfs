const mongoose = require("mongoose");

// Establish schema
const noteSchema = new mongoose.Schema({
    dateFromInput: { type: String, required: true }, // =dateInput

    keywords: { type: String }, // =keywords

    title: { type: String, default: "Journal Entry" }, // =title

    note: { type: String, required: true }, // =note

    noteId: { type: Number, default: Date.now }, // =id

    time: { type: Date, default: new Date().toISOString() }, // =time

    dateCreated: { type: Date, default: Date.now }, // =dateCreated

    dateModified: { type: Date, default: null }, // dateModified
});

// Instantiate model from schema and export it
module.exports = mongoose.model("Note", noteSchema);

/*




how it is in LS:
    dateInput: "27/1/25"
    id: 1737988579267
    keywords: "mishmash"
    note: "jurassic park, dark movies<br><br>all popular movies..."
    time: "2025-01-27T14:36:19.267Z"
    title: "Recent thoughts"

how it is in MongoDB:
    dateFromInput: "12/5/25"
    noteId: 1630803234201
    keywords: "database"
    note: "It is generally better to store \n (newline character) in the database…"
    time: 2025-05-12T04:52:22.906+00:00
    title: "What's better to store in a db, '\n' or '<br>'?"
    //
    dateModified: null
    dateCreated: 2025-05-12T04:58:24.613+00:00
    _id: 68217ff0bd794832550c422e

*/
