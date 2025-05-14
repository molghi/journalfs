// Prompt and open the window to choose the file
function importNotes(fileUploadInput) {
    alert(`NOTE:\n\nYou can import only JSON and it must be formatted exactly the same as what you can export.`);

    fileUploadInput.current.click(); // Click the file import btn

    // Everything after that happens in the 'onChange' event listener --> 'processInput'
}

// ================================================================================================

// Upon file upload
function processInput(event, setErrorMsg, notes) {
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

            // Add to the state and push to LS
            addFromImported(jsonData, notes);

            return console.log(`importing not finished yet`);

            // Visual.showMessage("success", `Import successful! Notes added: ${jsonData.length}`, undefined, "bottom");

            // if (!Visual.allEntriesSection.classList.contains("hidden")) {
            //     // means I am viewing all notes now and they must be updated (re-rendered)
            //     const updatedNotes = Logic.getStateNotes();
            //     const allNoteTitles = updatedNotes.map((noteObj) => noteObj.title);
            //     const allNoteIds = updatedNotes.map((noteObj) => noteObj.id);
            //     const allContentIds = updatedNotes.map((noteObj) => noteObj.note.slice(0, 50));
            //     Visual.renderEntriesBrowser(allNoteTitles, allNoteIds, allContentIds); // Render all miniatures
            //     Visual.clearAllNotes();
            //     updatedNotes.forEach((noteObj) => Visual.renderNote(noteObj)); // Render all notes
            //     const notesNumber = updatedNotes.length;
            //     Visual.updateSearchPlaceholder(notesNumber); // Update the placeholder (search form) to show how many notes there are
            //     document.querySelector(".all-entries__box").classList.remove("hidden");
            //     if (jsonData.length > 1) document.querySelector(".search").classList.remove("hidden");
            // }
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

// Dependency of 'processInput' --- The import was successful, now add to the state and push to LS
function addFromImported(importedArr, currentNotes) {
    console.log(importedArr);
    console.log(currentNotes);
    // Get only note IDs
    const stateNotesIds = currentNotes.map((noteObj) => noteObj.id);

    // Deep-copy currentNotes
    const currentNotesCopy = JSON.parse(JSON.stringify(currentNotes));

    // Change state
    importedArr.forEach((noteObj) => {
        if (stateNotesIds.includes(noteObj.id) || stateNotesIds.includes(noteObj.noteId)) {
            // Case here: state already has this note, so I replace it --> replace what can be changed: dateInput/dateFromInput, keywords, note, title.
            const indexInState = currentNotes.findIndex(
                (stateNote) => stateNote.id === noteObj.id || stateNote.noteId === noteObj.noteId
            );
            if (currentNotesCopy[indexInState].dateInput && noteObj.dateInput) {
                currentNotesCopy[indexInState].dateInput = noteObj.dateInput;
            } else {
                currentNotesCopy[indexInState].dateFromInput = noteObj.dateFromInput;
            }
            currentNotesCopy[indexInState].note = noteObj.note;
            currentNotesCopy[indexInState].title = noteObj.title;
            currentNotesCopy[indexInState].keywords = noteObj.keywords;
        } else {
            // Case here: state doesn't have this note, so I just push it
            currentNotesCopy.push(noteObj);
        }
    });

    console.log(currentNotesCopy);

    // Push to LS
    // saveNotesToLS();
}

// ================================================================================================

export { importNotes, processInput };
