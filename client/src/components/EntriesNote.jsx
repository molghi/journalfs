import "./styles/EntriesNote.scss";
import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../context/MyContext";
import {
    editKeywords,
    deleteNote,
    editTitle,
    saveTitle,
    editNote,
    saveNote,
    formatNote,
    formatKeywords,
} from "../utils/EntriesNoteFunctions";
import { decode } from "he"; // Remove HTML entities when displaying

const EntriesNote = ({ id, title, note, keywords, date, scrollBoxRef, dateModified }) => {
    const {
        searchTerm,
        isSearching,
        noteToScrollTo,
        setNoteToScrollTo,
        filterKeyword,
        setFilterKeyword,
        isFiltering,
        setIsFiltering,
        setErrorMsg,
        baseUrl,
        setNotes,
        localStorageKey,
        localStorageIDKey,
        notes,
    } = useContext(MyContext);

    const theElement = useRef();
    const titleInEdit = useRef();
    const noteInEdit = useRef();
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingNote, setEditingNote] = useState(false);
    const [editTitleValue, setEditTitleValue] = useState(title);
    const [editNoteValue, setEditNoteValue] = useState(note.replaceAll("<br>", "\n"));
    const [prevEditTitleValue, setPrevEditTitleValue] = useState("");
    const [prevEditNoteValue, setPrevEditNoteValue] = useState("");
    const isLast = notes[notes.length - 1].id === id; // Is this note the last one?

    // ============================================================================================================

    // Define if it should be shown or not

    let viewFlag = true;
    const titleHasSearchTerm = title.toLowerCase().includes(searchTerm.toLowerCase());
    const noteHasSearchTerm = note.toLowerCase().includes(searchTerm.toLowerCase());
    const keywordsHaveSearchTerm =
        typeof keywords === "string"
            ? keywords.toLowerCase().includes(searchTerm.toLowerCase())
            : keywords.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearchTerm = [titleHasSearchTerm, noteHasSearchTerm, keywordsHaveSearchTerm].some((x) => x === true);

    if (isSearching && !matchesSearchTerm) viewFlag = false;

    const keywordsHaveFilterTerm =
        typeof keywords === "string"
            ? keywords.toLowerCase().includes(filterKeyword.toLowerCase())
            : keywords.join(" ").toLowerCase().includes(filterKeyword.toLowerCase());

    if (isFiltering && !keywordsHaveFilterTerm) viewFlag = false;

    // ============================================================================================================

    // Replace slash entities with actual slashes

    const prettifyDate = (value) => (!value.includes("&#x2F;") ? value : value.replaceAll("&#x2F;", "/"));

    // ============================================================================================================

    // Convert "2025-05-13T03:18:55.702+00:00" to "13/5/25"

    const formatDate = (value) =>
        `${new Date(value).getDate()}/${new Date(value).getMonth() + 1}/${new Date(value).getFullYear().toString().slice(-2)}`;

    // ============================================================================================================

    // useEffect's

    useEffect(() => {
        // Focus title or note upon clicking on them (when they are in edit mode)
        if (editingTitle) titleInEdit.current.focus();
        if (editingNote) {
            noteInEdit.current.focus();
            // noteInEdit.current.setSelectionRange(noteInEdit.current.value.length, noteInEdit.current.value.length); // Position the cursor at the very end
        }
    }, [editingTitle, editingNote]);

    useEffect(() => {
        // Scroll to note
        if (noteToScrollTo && noteToScrollTo === id) {
            theElement.current.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to it
            theElement.current.style.animation = "shine 1s linear .5s 2"; // Add some finding animation (pulse twice)
            const timer = setTimeout(() => {
                theElement.current.style.animation = "none"; // Reset to re-apply later
                setNoteToScrollTo("");
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [noteToScrollTo]);

    // ============================================================================================================

    return (
        viewFlag && (
            <>
                <div ref={theElement} className="all-entries__note" data-id={id}>
                    <div className="all-entries__note-row">
                        {/* NOTE TITLE */}
                        <div
                            className="all-entries__note-title"
                            title="Click to edit, click out to save"
                            onClick={() => editTitle(editTitleValue, setEditingTitle, setPrevEditTitleValue)}
                            onBlur={() =>
                                saveTitle(
                                    editTitleValue,
                                    setEditingTitle,
                                    baseUrl,
                                    id,
                                    setNotes,
                                    localStorageKey,
                                    localStorageIDKey,
                                    prevEditTitleValue
                                )
                            }
                        >
                            {!editingTitle ? (
                                decode(editTitleValue)
                            ) : (
                                <input
                                    type="text"
                                    value={editTitleValue}
                                    onChange={(e) => setEditTitleValue(e.target.value)}
                                    className="input-edit"
                                    ref={titleInEdit}
                                />
                            )}
                        </div>
                    </div>
                    <div className="all-entries__note-row">
                        {/* NOTE TEXT/BODY */}
                        <div
                            className="all-entries__note-text"
                            title="Click to edit, click out to save"
                            onClick={() =>
                                editNote(editNoteValue, setEditingNote, theElement, scrollBoxRef, isLast, setPrevEditNoteValue)
                            }
                            onBlur={() =>
                                saveNote(
                                    editNoteValue,
                                    setEditingNote,
                                    baseUrl,
                                    id,
                                    setNotes,
                                    localStorageKey,
                                    localStorageIDKey,
                                    prevEditNoteValue
                                )
                            }
                        >
                            {!editingNote ? (
                                formatNote(decode(editNoteValue))
                            ) : (
                                <textarea
                                    className="input-edit textarea-edit"
                                    ref={noteInEdit}
                                    value={decode(editNoteValue)}
                                    onChange={(e) => setEditNoteValue(e.target.value)}
                                    style={{ height: window.innerHeight * 0.63 }}
                                ></textarea>
                            )}
                        </div>
                    </div>
                    <div className="all-entries__note-row">
                        {/* KEYWORDS */}
                        <div className="all-entries__note-keywords">
                            <span
                                title="Click to edit keywords"
                                onClick={() =>
                                    editKeywords(keywords, setErrorMsg, baseUrl, id, setNotes, localStorageKey, localStorageIDKey)
                                }
                            >
                                Keywords:
                            </span>
                            {formatKeywords(keywords, setFilterKeyword, setIsFiltering)}
                        </div>
                        {/* DATE */}
                        <div
                            className="all-entries__note-date"
                            title={`Created on ${prettifyDate(date)}${
                                dateModified ? ` - Modified on ${formatDate(dateModified)}` : ""
                            }`}
                        >
                            Date: {prettifyDate(date)}
                        </div>
                    </div>
                    {/* DELETE BUTTON */}
                    <div
                        className="all-entries__note-button"
                        title="Delete Note"
                        onClick={() => deleteNote(title, id, baseUrl, setNotes, localStorageKey, localStorageIDKey)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            &lt;
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                        </svg>
                    </div>
                </div>
            </>
        )
    );
};

export default EntriesNote;
