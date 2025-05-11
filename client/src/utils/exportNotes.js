function exportNotes() {
    console.log("exportNotes");

    let answer = prompt(`Choose the format: TXT or JSON?
    JSON: bad for reading, good for importing
    TXT: good for reading, bad for importing`); // prompt

    if (!answer) return;

    answer = answer.toLowerCase().trim();

    if (answer !== "txt" && answer !== "json") return;

    answer === "json" ? exportNotesJson() : exportNotesTxt(); // exporting as JSON or TXT
}

// ================================================================================================

// Dependency of 'exportNotes' -- Export as .json
function exportNotesJson() {
    return console.log("json export not configured yet --> set the value of 'data'");
    const data = null; // get all notes here
    const now = new Date();

    const filename = `my-notes--${now.getDate()}-${now.getMonth() + 1}-${now
        .getFullYear()
        .toString()
        .slice(2)}--${now.getHours()}-${now.getMinutes()}.json`;

    const json = JSON.stringify(data, null, 2); // Converting data to JSON: Converts the JavaScript object 'data' into a formatted JSON string. The 'null, 2' arguments ensure the output is pretty-printed with 2-space indentation for readability.
    const blob = new Blob([json], { type: "application/json" }); // Creating a blob: Creates a binary large object (Blob) containing the JSON string, specifying the MIME type as 'application/json' to ensure it's recognised as a JSON file.
    const url = URL.createObjectURL(blob); // Creating a download URL: Generates a temporary URL pointing to the Blob, enabling it to be downloaded as a file by associating it with a download link.

    // Create an invisible anchor element for downloading
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Click programmatically and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up the URL
}

// ================================================================================================

// Dependency of 'exportNotes' -- Export as .txt
function exportNotesTxt() {
    return console.log("txt export not configured yet --> set the value of 'data' in 'prepareForExport'");
    const data = prepareForExport();

    const filename = `my-notes--${now.getDate()}-${now.getMonth() + 1}-${now
        .getFullYear()
        .toString()
        .slice(2)}--${now.getHours()}-${now.getMinutes()}.txt`;

    const blob = new Blob([data], { type: "text/plain" }); // Create a Blob with the content and specify text/plain MIME type

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

// Dependency of 'exportNotesTxt' -- Prepare notes to be exported as .txt -- Just to have it nicely formatted
function prepareForExport() {
    const data = null; // get all notes here

    const separator = `---------------------------------------------------------------------`;

    const result = data.map((noteObj) => {
        const trueTime = new Date(noteObj.time);
        const trueDate = `${trueTime.getDate()}/${trueTime.getMonth() + 1}/${trueTime.getFullYear().toString().slice(2)}`;
        const keywords = !noteObj.keywords
            ? ""
            : !Array.isArray(noteObj.keywords)
            ? `Keywords: ${noteObj.keywords}\n\n`
            : `Keywords: ${noteObj.keywords.join(", ")}\n\n`;
        return `${noteObj.title}\n\n${noteObj.note.replaceAll("<br>", "\n")}\n\n${keywords}Date: ${
            noteObj.dateInput
        }  (${trueDate})\n\n\n${separator}\n\n\n`;
    });

    const notesNum = result.length;
    result.unshift(`Your Notes (${notesNum})\n\n\n`, separator + "\n\n\n");
    return result.join("");
}

// ================================================================================================

export default exportNotes;
