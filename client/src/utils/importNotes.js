// Prompt and open the window to choose the file
function importNotes(fileUploadInput) {
    console.log("importNotes");

    alert(`NOTE:\nYou can import only JSON and it must be formatted exactly the same as the one you can export.`);

    fileUploadInput.current.click(); // Click the file import btn

    // Everything after that happens in the 'onChange' event listener --> 'processInput'
}

// ================================================================================================

// Upon file upload
function processInput(event, setErrorMsg) {
    const file = event.target.files[0]; // Get the file
    if (!file) return; // Ensure there's a file selected

    const reader = new FileReader(); // Create FileReader instance

    reader.onload = (e) => {
        try {
            const jsonData = JSON.parse(e.target.result); // Parse the JSON content
            const isValidInput = checkValidInput(jsonData);

            if (!isValidInput) {
                setErrorMsg(`Invalid JSON! Check the formatting: you can import JSON formatted the same as what you can export.`);
                return console.error(
                    `Invalid JSON!\nPerhaps the formatting of the file was wrong...\nYou can import JSON formatted the same as what you can export.`
                );
            }

            return console.log(`importing not configured yet --> here you must push the imported to your app`);
            // addFromImported(jsonData); // Add to the state and pushing to LS
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
            console.error("Invalid input file", err); // Error handling
            setErrorMsg(`Invalid input file! You can import only JSON and it must be formatted the same as what you can export.`);
            return null;
        } finally {
            event.target.value = ""; // Reset the file input value to be able to import again
        }
    };

    reader.readAsText(file); // Read the file as text
}

// ================================================================================================

// Dependency of 'processInput' -- Validate the input -- Make sure it's formatted the way I allow it
function checkValidInput(arr) {
    if (!Array.isArray(arr)) return;
    let passed = true;

    arr.forEach((noteObj) => {
        if (!noteObj.hasOwnProperty("dateInput")) return (passed = false);
        if (!noteObj.hasOwnProperty("id")) return (passed = false);
        if (!noteObj.hasOwnProperty("keywords")) return (passed = false);
        if (!noteObj.hasOwnProperty("note")) return (passed = false);
        if (!noteObj.hasOwnProperty("time")) return (passed = false);
        if (!noteObj.hasOwnProperty("title")) return (passed = false);

        if (typeof noteObj.dateInput !== "string") return (passed = false);
        if (typeof noteObj.id !== "number") return (passed = false);
        if (typeof noteObj.keywords !== "string" && !Array.isArray(noteObj.keywords)) return (passed = false);
        if (typeof noteObj.note !== "string") return (passed = false);
        if (typeof noteObj.time !== "string") return (passed = false);
        if (typeof noteObj.title !== "string") return (passed = false);
    });

    return passed;
}

// ================================================================================================

// Dependency of 'processInput' --- The import was successful, now add to the state and push to LS
function addFromImported(arr) {
    const stateNotesIds = Logic.getStateNotes().map((noteObj) => noteObj.id);

    // Change state
    arr.forEach((noteObj) => {
        if (stateNotesIds.includes(noteObj.id)) {
            // state already has this note, so I replace it --> replace in it what can be changed: dateInput, keywords, note, title.
            const indexInState = Logic.getStateNotes().findIndex((stateNote) => stateNote.id === noteObj.id);
            Logic.getStateNotes()[indexInState].dateInput = noteObj.dateInput;
            Logic.getStateNotes()[indexInState].note = noteObj.note;
            Logic.getStateNotes()[indexInState].title = noteObj.title;
            Logic.getStateNotes()[indexInState].keywords = noteObj.keywords;
        } else {
            // state doesn't have this note, so I just push it
            Logic.getStateNotes().push(noteObj);
        }
    });

    // Push to LS
    Logic.saveNotesToLS();
}

// ================================================================================================

export { importNotes, processInput };
