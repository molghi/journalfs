function exportNotes(baseUrl, notes) {
    // Prompt
    let answer = prompt(`Choose the format: TXT or JSON?
    JSON: bad for reading, good for importing
    TXT: good for reading, bad for importing`);

    if (!answer) return;

    answer = answer.toLowerCase().trim();

    if (answer !== "txt" && answer !== "json") return;

    // Export as JSON or TXT
    answer === "json" ? exportNotesJson(notes) : exportNotesTxt(notes);

    console.log(`Exported as ${answer} ✅.`);
}

// ================================================================================================

// Dependency of 'exportNotes' -- Export as .json
function exportNotesJson(notes) {
    // Get all notes
    const data = notes;

    const now = new Date();

    // Generate file name
    const filename = `my-notes--${now.getDate()}-${now.getMonth() + 1}-${now
        .getFullYear()
        .toString()
        .slice(2)}--${now.getHours()}-${now.getMinutes()}.json`;

    // Convert data to JSON: Convert the JavaScript object 'data' into a formatted JSON string. The 'null, 2' arguments ensure the output is pretty-printed with 2-space indentation for readability.
    const json = JSON.stringify(data, null, 2);
    // Create a blob: Create a binary large object (Blob) containing the JSON string, specifying the MIME type as 'application/json' to ensure it's recognised as a JSON file.
    const blob = new Blob([json], { type: "application/json" });
    // Create a download URL: Generate a temporary URL pointing to the Blob, enabling it to be downloaded as a file by associating it with a download link.
    const url = URL.createObjectURL(blob);

    // Create an invisible anchor element for downloading
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Click programmatically and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    URL.revokeObjectURL(url);
}

// ================================================================================================

// Dependency of 'exportNotes' -- Export as .txt
function exportNotesTxt(notes) {
    // Prepare notes to be exported, have them nicely formatted
    const data = prepareForExport(notes);

    const now = new Date();

    // Generate file name
    const filename = `my-notes--${now.getDate()}-${now.getMonth() + 1}-${now
        .getFullYear()
        .toString()
        .slice(2)}--${now.getHours()}-${now.getMinutes()}.txt`;

    // Create a Blob with the content and specify text/plain MIME type
    const blob = new Blob([data], { type: "text/plain" });

    const link = document.createElement("a"); // Create a temporary link element
    link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
    link.download = filename; // Set the filename for download

    // Click programmatically and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href); // Clean up the object URL
}

// ================================================================================================

// Dependency of 'exportNotesTxt' -- Prepare notes to be exported as .txt -- Just to have them nicely formatted
function prepareForExport(notes) {
    const data = notes; // get all notes here

    const separator = `---------------------------------------------------------------------`;

    const result = data.map((noteObj) => {
        const trueTime = new Date(noteObj.time);

        const trueDate = `${trueTime.getDate()}/${trueTime.getMonth() + 1}/${trueTime.getFullYear().toString().slice(2)}`;

        const keywords = !noteObj.keywords
            ? ""
            : !Array.isArray(noteObj.keywords)
            ? `Keywords: ${noteObj.keywords}\n\n`
            : `Keywords: ${noteObj.keywords.join(", ")}\n\n`;

        return `${noteObj.title}\n\n\n${noteObj.note.replaceAll("<br>", "\n")}\n\n\n${keywords}Date: ${
            noteObj.dateInput || noteObj.dateFromInput
        }  (${trueDate})\n\n\n${separator}\n\n\n`;
    });

    const notesNumber = result.length;

    result.unshift(`Your Notes (${notesNumber})\n\n\n`, separator + "\n\n\n");

    return result.join("");
}

// ================================================================================================

export default exportNotes;
