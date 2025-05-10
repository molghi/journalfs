import React from "react";
import "./styles/EntriesNote.scss";

const EntriesNote = ({ id, title, note, keywords, date }) => {
    return (
        <>
            <div className="all-entries__note" data-id={id}>
                <div className="all-entries__note-row">
                    {/* NOTE TITLE */}
                    <div className="all-entries__note-title">{title}</div>
                </div>
                <div className="all-entries__note-row">
                    {/* NOTE TEXT/BODY */}
                    <div className="all-entries__note-text">
                        {!note.includes("<br />")
                            ? note
                            : note.split("<br />").map((line, index) => (
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
                        <span title="Click to edit keywords">Keywords: </span>{" "}
                        {!keywords.includes(",") ? (
                            <button className="all-entries__note-keyword">{keywords}</button>
                        ) : (
                            keywords.split(",").map((word, index) => (
                                <button key={index} className="all-entries__note-keyword">
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
                <div className="all-entries__note-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        &lt;
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default EntriesNote;
