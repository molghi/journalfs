import "./styles/EntriesNotes.scss";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import EntriesNote from "./EntriesNote";

// This is where the note entries are
const EntriesNotes = () => {
    const { notes } = useContext(MyContext);

    return (
        <div className="all-entries__notes">
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
                    />
                ))}
        </div>
    );
};

export default EntriesNotes;
