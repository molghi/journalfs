import "./styles/EntriesNote.scss";
import React from "react";
import { useContext, useEffect, useRef } from "react";
import MyContext from "../context/MyContext";

const EntriesNote = ({ id, title, note, keywords, date }) => {
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
    } = useContext(MyContext);
    const theElement = useRef();
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

    const filterByKeyword = (e) => {
        setFilterKeyword(e.target.textContent);
        setIsFiltering(true);
    };

    const editKeywords = () => {
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

    const deleteNote = () => {
        const answer = window.confirm(`Are you sure you want to delete this note?\n\n${title}`);
        if (!answer) return;
        console.log(
            `deleteNote`,
            id,
            `\n  send the DELETE req with id\n  if returns success, modify 'notes' in Context\n  when it happens, all re-renders\n  but you also change it in LS`
        );
    };

    const editTitle = () => {
        console.log(`editTitle:`, title);
    };

    const editNote = () => {
        console.log(`editNote:\n`, note);
    };

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

    return (
        viewFlag && (
            <>
                <div ref={theElement} className="all-entries__note" data-id={id}>
                    <div className="all-entries__note-row">
                        {/* NOTE TITLE */}
                        <div className="all-entries__note-title" title="Click to edit, click out to save" onClick={editTitle}>
                            {title}
                        </div>
                    </div>
                    <div className="all-entries__note-row">
                        {/* NOTE TEXT/BODY */}
                        <div className="all-entries__note-text" title="Click to edit, click out to save" onClick={editNote}>
                            {!note.includes("<br>")
                                ? note
                                : note.split("<br>").map((line, index) => (
                                      <React.Fragment key={index}>
                                          {line}
                                          <br />
                                      </React.Fragment>
                                  ))}
                        </div>
                    </div>
                    <div className="all-entries__note-row">
                        {/* KEYWORDS */}
                        <div className="all-entries__note-keywords">
                            <span title="Click to edit keywords" onClick={editKeywords}>
                                Keywords:{" "}
                            </span>{" "}
                            {typeof keywords === "string" ? (
                                <button
                                    className="all-entries__note-keyword"
                                    title={`Filter by "${keywords}"`}
                                    onClick={filterByKeyword}
                                >
                                    {keywords}
                                </button>
                            ) : (
                                keywords.map((word, index) => (
                                    <button
                                        key={index}
                                        className="all-entries__note-keyword"
                                        title={`Filter by "${word}"`}
                                        onClick={filterByKeyword}
                                    >
                                        {word}
                                    </button>
                                ))
                            )}
                        </div>
                        {/* DATE */}
                        <div className="all-entries__note-date" title={`Created on ${date}`}>
                            Date: {date}
                        </div>
                    </div>
                    {/* DELETE BUTTON */}
                    <div className="all-entries__note-button" title="Delete Note" onClick={deleteNote}>
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
