import React from "react";
import axios from "axios";
import { saveNotesToLS } from "./localStorageFunctions";
import { decode } from "he"; // Remove HTML entities when displaying

// ================================================================================================

// Filter by keyword

const filterByKeyword = (e, setFilterKeyword, setIsFiltering) => {
    setFilterKeyword(e.target.textContent);
    setIsFiltering(true);
};

// ================================================================================================

// Edit keywords

const editKeywords = async (keywords, setErrorMsg, baseUrl, id, setNotes, localStorageKey, localStorageIDKey) => {
    try {
        // Prompt
        const input = prompt(`Edit your keywords: (if more than one, separate by commas)`, keywords);

        // Validate
        if (input === null) return;
        if (input.trim() === keywords) return; // if new input is the same as current value, return
        if (!/^[a-zA-Z0-9][a-zA-Z0-9 ,.-]*[a-zA-Z0-9]$/.test(input.trim())) {
            return setErrorMsg(
                "Keywords can contain alphanumerics, whitespace, hyphens and commas, but cannot start or end with hyphens or commas."
            );
        }

        // Clear errors
        setErrorMsg("");

        // BACK-END COMMENTED OUT
        // Send request to update keywords
        // const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
        // const resp = await axios.patch(`${baseUrl}/notes/${id}`, { keywords: decode(input), userIdentifier: userIdentifierInLS });

        // If returns success, update 'notes' in Context and change them in LS
        // if (resp.data.status === "Note keywords updated successfully") {
        //     setNotes((prev) => {
        //         const newNotes = prev.map((note) => {
        //             if (note.id === resp.data.message.id) {
        //                 return { ...note, keywords: resp.data.message.keywords, dateModified: resp.data.message.dateModified }; // spread and change its keywords and dateModified
        //             }
        //             return note;
        //         });
        //         saveNotesToLS(localStorageKey, newNotes); // save to LS
        //         return newNotes;
        //     });
        //     console.log(`Note keywords updated ✅. LS updated.`);
        // }

        // NON-BACK-END VERSION
        setNotes((prev) => {
            const newNotes = prev.map((note) => {
                if (note.id === id) {
                    return { ...note, keywords: decode(input), dateModified: Date.now() }; // spread and change its keywords and dateModified
                }
                return note;
            });
            saveNotesToLS(localStorageKey, newNotes); // save to LS
            return newNotes;
        });
    } catch (error) {
        console.log(`💥 Error editing keywords`, error);
    }
};

// ================================================================================================

// Delete note

const deleteNote = async (title, id, baseUrl, setNotes, localStorageKey, localStorageIDKey) => {
    try {
        // Prompt
        const answer = window.confirm(`Are you sure you want to delete this note?\n\n${title}`);
        if (!answer) return;

        // BACK-END COMMENTED OUT
        // Send request to delete
        // const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
        // const resp = await axios.delete(`${baseUrl}/notes/${id}`, { data: { userIdentifier: userIdentifierInLS } });

        // If returns success, update 'notes' in Context and change them in LS
        // if (resp.data.message === "Note deleted successfully") {
        //     setNotes((prev) => {
        //         const newNotes = prev.filter((note) => note.id !== resp.data.deletedItem.id); // filter out
        //         saveNotesToLS(localStorageKey, newNotes); // save to LS
        //         return newNotes;
        //     });
        //     console.log(`Note '${title}' deleted ✅. LS updated.`);
        // }

        // NON-BACK-END VERSION
        setNotes((prev) => {
            const newNotes = prev.filter((note) => note.id !== id); // filter out
            saveNotesToLS(localStorageKey, newNotes); // save to LS
            return newNotes;
        });
    } catch (error) {
        console.log(`💥 Error deleting note`, error);
    }
};

// ================================================================================================

// Edit note title

const editTitle = (title, setEditingTitle, setPrevEditTitleValue) => {
    setPrevEditTitleValue(title);
    setEditingTitle(true);
};

// ================================================================================================

// Save note title

const saveTitle = async (
    newTitle,
    setEditingTitle,
    baseUrl,
    id,
    setNotes,
    localStorageKey,
    localStorageIDKey,
    prevEditTitleValue
) => {
    try {
        // Edit mode on title is off
        setEditingTitle(false);

        // If new value is the same as old value, just return
        if (prevEditTitleValue.trim() === decode(newTitle.trim())) return;

        // BACK-END COMMENTED OUT
        // Send request to update title
        // const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
        // const resp = await axios.patch(`${baseUrl}/notes/${id}`, {
        //     title: decode(newTitle.trim()),
        //     userIdentifier: userIdentifierInLS,
        // });

        // If returns success, update 'notes' in Context and change them in LS
        // if (resp.data.status === "Note title updated successfully") {
        //     setNotes((prev) => {
        //         const newNotes = prev.map((note) => {
        //             if (note.id === resp.data.message.id) {
        //                 return { ...note, title: resp.data.message.title, dateModified: resp.data.message.dateModified }; // spread and change its title and dateModified
        //             }
        //             return note;
        //         });
        //         saveNotesToLS(localStorageKey, newNotes); // save to LS
        //         return newNotes;
        //     });
        //     console.log(`Note title updated ✅. LS updated.`);
        // }

        // NON-BACK-END VERSION
        setNotes((prev) => {
            const newNotes = prev.map((note) => {
                if (note.id === id) {
                    return { ...note, title: decode(newTitle.trim()), dateModified: Date.now() }; // spread and change its title and dateModified
                }
                return note;
            });
            saveNotesToLS(localStorageKey, newNotes); // save to LS
            return newNotes;
        });
    } catch (error) {
        console.log(`💥 Error saving note title`, error);
    }
};

// ================================================================================================

// Edit note (note body)

const editNote = (note, setEditingNote, theElement, scrollBoxRef, isLast, setPrevEditNoteValue) => {
    setPrevEditNoteValue(note);
    setEditingNote(true);

    // Wait for the element to render and adjust its height
    setTimeout(() => {
        theElement.current.scrollIntoView({
            block: isLast ? "end" : "start", // If it's the last element, scroll it to the bottom, else scroll it to the top
        });
    }, 0); // Delay the scroll logic to the next event loop cycle
};

// ================================================================================================

// Save note (note body)

const saveNote = async (
    newNote,
    setEditingNote,
    baseUrl,
    id,
    setNotes,
    localStorageKey,
    localStorageIDKey,
    prevEditNoteValue
) => {
    try {
        // Edit mode on note is off
        setEditingNote(false);

        // If new value is the same as old value, just return
        if (prevEditNoteValue.trim() === decode(newNote).trim()) return;

        // BACK-END COMMENTED OUT
        // Send request to update note body
        // const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
        // const resp = await axios.patch(`${baseUrl}/notes/${id}`, { note: decode(newNote), userIdentifier: userIdentifierInLS });

        // If returns success, update 'notes' in Context and change them in LS
        // if (resp.data.status === "Note body updated successfully") {
        //     setNotes((prev) => {
        //         const newNotes = prev.map((note) => {
        //             if (note.id === resp.data.message.id) {
        //                 return { ...note, note: resp.data.message.note, dateModified: resp.data.message.dateModified }; // spread and change note body and dateModified
        //             }
        //             return note;
        //         });
        //         saveNotesToLS(localStorageKey, newNotes); // save to LS
        //         return newNotes;
        //     });
        //     console.log(`Note body updated ✅. LS updated.`);
        // }

        // NON-BACK-END VERSION
        setNotes((prev) => {
            const newNotes = prev.map((note) => {
                if (note.id === id) {
                    return { ...note, note: decode(newNote), dateModified: Date.now() }; // spread and change note body and dateModified
                }
                return note;
            });
            saveNotesToLS(localStorageKey, newNotes); // save to LS
            return newNotes;
        });
    } catch (error) {
        console.log(`💥 Error saving note body`, error);
    }
};

// ================================================================================================

// Format note

const formatNote = (note) => {
    // Replace <br> in note body text to display correctly -- needed only when I'm displaying content in UI
    if (note.includes("<br>")) {
        return note.split("<br>").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    return note;
};

// ================================================================================================

// Format keywords

const formatKeywords = (keywordsString, setFilterKeyword, setIsFiltering) => {
    if (typeof keywordsString === "string") {
        // If string has commas, split and map
        if (keywordsString.includes(",")) {
            return keywordsString.split(",").map((word, index) => (
                <button
                    key={index}
                    className="all-entries__note-keyword"
                    title={`Filter by "${word.trim()}"`}
                    onClick={(e) => filterByKeyword(e, setFilterKeyword, setIsFiltering)}
                >
                    {word.trim()}
                </button>
            ));
        }

        // If string has no commas, it's a single keyword there
        return (
            <button
                className="all-entries__note-keyword"
                title={`Filter by "${keywordsString}"`}
                onClick={(e) => filterByKeyword(e, setFilterKeyword, setIsFiltering)}
            >
                {keywordsString}
            </button>
        );
    } else {
        // keywordsString aren't type string --> it is type array, so just map it
        return keywordsString.map((word, index) => (
            <button
                key={index}
                className="all-entries__note-keyword"
                title={`Filter by "${word}"`}
                onClick={(e) => filterByKeyword(e, setFilterKeyword, setIsFiltering)}
            >
                {word}
            </button>
        ));
    }
};

// ================================================================================================

export { filterByKeyword, editKeywords, deleteNote, editTitle, saveTitle, editNote, saveNote, formatNote, formatKeywords };
