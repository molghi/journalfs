import "./styles/EntriesNotes.scss";
import { useContext, useRef } from "react";
import MyContext from "../context/MyContext";
import EntriesNote from "./EntriesNote";

// This is where the note entries are
const EntriesNotes = () => {
    const { notes } = useContext(MyContext);
    const scrollBoxEl = useRef();

    return (
        <div ref={scrollBoxEl} className="all-entries__notes">
            {notes &&
                notes.length > 0 &&
                notes.map((noteObj) => (
                    <EntriesNote
                        key={noteObj.id}
                        id={noteObj.id}
                        title={noteObj.title}
                        note={noteObj.note}
                        keywords={noteObj.keywords}
                        date={noteObj.dateInput}
                        scrollBoxRef={scrollBoxEl}
                    />
                ))}
        </div>
    );
};

export default EntriesNotes;
