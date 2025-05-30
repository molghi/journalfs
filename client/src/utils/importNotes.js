import axios from "axios";
import { decode } from "he"; // Remove HTML entities when displaying
import { saveNotesToLS } from "../utils/localStorageFunctions";
import getAllNotes from "./getAllNotes";

// ================================================================================================

// Prompt and open the window to choose the file
function importNotes(fileUploadInput) {
    alert(`NOTE:\n\nYou can import only JSON and it must be formatted exactly the same as what you can export.`);

    fileUploadInput.current.click(); // Click the file import btn

    // Everything after that happens in the 'onChange' event listener --> 'processInput' here
}

// ================================================================================================

// Upon file upload
function processInput(
    event,
    setErrorMsg,
    notes,
    baseUrl,
    localStorageIDKey,
    setIsLoading,
    localStorageKey,
    setNotes,
    setNotificationMsg
) {
    const file = event.target.files[0]; // Get the file
    if (!file) return; // Ensure there's a file selected

    const reader = new FileReader(); // Create FileReader instance

    reader.onload = (e) => {
        try {
            // Parse the JSON content
            const jsonData = JSON.parse(e.target.result);
            // Verify it has all needed fields; it returns boolean
            const isValidInput = checkValidInput(jsonData);

            if (!isValidInput) {
                setErrorMsg(`Invalid JSON! Check the formatting: you can import JSON formatted the same as what you can export.`);
                return console.error(
                    `Invalid JSON!\nPerhaps the formatting of the file was wrong.\nYou can import JSON formatted the same as what you can export.`
                );
            }

            // Add to db, after which get all and save to LS
            addFromImported(
                jsonData,
                notes,
                baseUrl,
                localStorageIDKey,
                setIsLoading,
                localStorageKey,
                setNotes,
                setNotificationMsg,
                setErrorMsg
            );
        } catch (err) {
            console.error("Invalid input file", err);
            setErrorMsg(`Invalid input file! You can import only JSON and it must be formatted the same as what you can export.`);
            return null;
        } finally {
            event.target.value = ""; // Reset the file input value to be able to import again
        }
    };

    reader.readAsText(file); // Read the file as text
}

// ================================================================================================

// Dependency of 'processInput' -- Validate the input -- Make sure it's formatted the way I allow it -- Returns boolean
function checkValidInput(arr) {
    let passed = true;

    if (!Array.isArray(arr)) return (passed = false);

    arr.forEach((noteObj) => {
        if (!noteObj.hasOwnProperty("dateInput") && !noteObj.hasOwnProperty("dateFromInput")) return (passed = false); // If the object lacks both dateInput and dateFromInput, passed becomes false
        if (!noteObj.hasOwnProperty("id") && !noteObj.hasOwnProperty("noteId")) return (passed = false);
        if (!noteObj.hasOwnProperty("keywords")) return (passed = false);
        if (!noteObj.hasOwnProperty("note")) return (passed = false);
        if (!noteObj.hasOwnProperty("time")) return (passed = false);
        if (!noteObj.hasOwnProperty("title")) return (passed = false);

        if (typeof noteObj.dateInput !== "string" && typeof noteObj.dateFromInput !== "string") return (passed = false);
        if (typeof noteObj.id !== "number" && typeof noteObj.noteId !== "number") return (passed = false);
        if (typeof noteObj.keywords !== "string" && !Array.isArray(noteObj.keywords)) return (passed = false);
        if (typeof noteObj.note !== "string") return (passed = false);
        if (typeof noteObj.time !== "string") return (passed = false);
        if (typeof noteObj.title !== "string") return (passed = false);
    });

    return passed;
}

// ================================================================================================

// Dependency of 'processInput' --- The import was successful, now add to the state/db and save to LS
async function addFromImported(
    importedArr,
    currentNotes,
    baseUrl,
    localStorageIDKey,
    setIsLoading,
    localStorageKey,
    setNotes,
    setNotificationMsg,
    setErrorMsg
) {
    // Get only note IDs
    const stateNotesIds = currentNotes.map((noteObj) => noteObj.id);

    // Deep-copy currentNotes (current state)
    const currentNotesCopy = JSON.parse(JSON.stringify(currentNotes));

    // Generate new notes that would be sent to db
    importedArr.forEach((noteObj) => {
        if (stateNotesIds.includes(noteObj.id)) {
            // Case here: state already has this note, so I replace it --> replace what can be changed: dateInput, keywords, note, title.
            const indexInState = currentNotes.findIndex((stateNote) => stateNote.id === noteObj.id);
            if (noteObj.dateInput.trim()) {
                currentNotesCopy[indexInState].dateInput = noteObj.dateInput.trim();
            }
            if (noteObj.note.trim()) {
                currentNotesCopy[indexInState].note = noteObj.note.trim();
            }
            if (noteObj.title.trim()) {
                currentNotesCopy[indexInState].title = noteObj.title.trim();
            }
            const keywords = typeof noteObj.keywords === "string" ? noteObj.keywords : noteObj.keywords.join();
            currentNotesCopy[indexInState].keywords = keywords.trim();
        } else {
            // Case here: state doesn't have this note, so I just push it
            currentNotesCopy.push(noteObj);
        }
    });

    // BACK-END COMMENTED OUT
    // Get the final formatted version to send request with
    // const finalVersion = currentNotesCopy.map((noteObj) => {
    //     delete noteObj.__v; // Delete fields that will be auto created by Mongo
    //     delete noteObj._id;
    //     delete noteObj.userIdentifier;
    //     noteObj.dateCreated = decode(noteObj.dateCreated); // Decode here to encode only once on the backend
    //     noteObj.dateInput = decode(noteObj.dateInput);
    //     noteObj.dateModified = decode(noteObj.dateModified);
    //     noteObj.keywords = decode(noteObj.keywords);
    //     noteObj.note = decode(noteObj.note);
    //     noteObj.time = decode(noteObj.time);
    //     noteObj.title = decode(noteObj.title);
    //     return noteObj;
    // });

    // Send request to import to db
    // const userIdentifierFromLS = localStorage.getItem(localStorageIDKey);
    // const resp = await axios.post(`${baseUrl}/import`, { notes: finalVersion, userIdentifier: userIdentifierFromLS });

    // Check response
    // if (resp.status === 200) {
    //     getAllNotes(setIsLoading, localStorageIDKey, localStorageKey, baseUrl, setNotes);
    //     setNotificationMsg("Import successful ✅");
    //     console.log("Import successful ✅");
    // } else {
    //     setErrorMsg(
    //         "Import failed 🚫 Make sure the JSON you import is formatted exactly the same as what you can export, or try again later."
    //     );
    // }

    // NON-BACK-END VERSION
    setNotes((prev) => {
        let newNotes = [...currentNotesCopy];
        saveNotesToLS(localStorageKey, newNotes);
        return newNotes;
    });
    setNotificationMsg(`Import: ${currentNotesCopy.length} notes: successful ✅`);
    console.log(`Import: ${currentNotesCopy.length} notes: successful ✅`);
}

// ================================================================================================

export { importNotes, processInput };
