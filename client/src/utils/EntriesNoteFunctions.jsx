import React from "react";

// Filter by keyword
const filterByKeyword = (e, setFilterKeyword, setIsFiltering) => {
    console.log(e.target.textContent);
    setFilterKeyword(e.target.textContent);
    setIsFiltering(true);
};

// ================================================================================================

// Edit keywords
const editKeywords = (keywords, setErrorMsg) => {
    console.log(`editKeywords: keywords now:`, keywords);
    const input = prompt(`Edit your keywords: (if more than one, separate by commas)`, keywords);
    if (input === null) return;
    if (input.trim() === keywords) return;
    if (!/^[a-zA-Z0-9][a-zA-Z0-9 ,.-]*[a-zA-Z0-9]$/.test(input.trim())) {
        return setErrorMsg(
            "Keywords can contain alphanumerics, whitespace, hyphens and commas, but cannot start or end with hyphens or commas."
        );
    }
    setErrorMsg("");
    console.log(
        input,
        `\n  send a PATCH req with id and these new keywords\n  if returns success, modify 'notes' in Context\n  when it happens, all re-renders\n  but you also change it in LS`
    );
};

// ================================================================================================

// Delete note
const deleteNote = (title) => {
    const answer = window.confirm(`Are you sure you want to delete this note?\n\n${title}`);
    if (!answer) return;
    console.log(
        `deleteNote`,
        id,
        `\n  send the DELETE req with id\n  if returns success, modify 'notes' in Context\n  when it happens, all re-renders\n  but you also change it in LS`
    );
};

// ================================================================================================

// Edit title
const editTitle = (title, setEditingTitle) => {
    console.log(`editTitle:`, title);
    setEditingTitle(true);
};

// ================================================================================================

// Save title
const saveTitle = (newTitle, setEditingTitle) => {
    console.log("saveTitle:", newTitle);
    setEditingTitle(false);
};

// ================================================================================================

// Edit note
const editNote = (note, setEditingNote, theElement, scrollBoxRef) => {
    console.log(`editNote:\n`, note.slice(0, 40));
    setEditingNote(true);
    // Get the position of theElement relative to scrollBox
    const relativePosition = theElement.current.getBoundingClientRect().top - scrollBoxRef.current.getBoundingClientRect().top;
    // Scroll to bring theElement to the top of scrollBox
    scrollBoxRef.current.scrollTop += relativePosition;
};

// ================================================================================================

// Save note
const saveNote = (newNote, setEditingNote) => {
    console.log("saveNote:", newNote.slice(0, 40));
    setEditingNote(false);
};

// ================================================================================================

// Replace <br> in note body text to display correctly -- needed only when I'm displaying content in UI
const resolveNoteLineBreaks = (note) => {
    return !note.includes("<br>")
        ? note
        : note.split("<br>").map((line, index) => (
              <React.Fragment key={index}>
                  {line}
                  <br />
              </React.Fragment>
          ));
};

// ================================================================================================

export { filterByKeyword, editKeywords, deleteNote, editTitle, saveTitle, editNote, saveNote, resolveNoteLineBreaks };
