import "./styles/EntriesBrowser.scss";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import EntriesMiniature from "./EntriesMiniature";

// This renders just the miniatures container, the left sidebar
const EntriesBrowser = ({ notesMatchSearch }) => {
    const { notes, setNoteToScrollTo } = useContext(MyContext);

    // Format for the title attr
    const getTitleAttr = (noteObj) => {
        const title = `${noteObj.title.slice(0, 50)}`;
        const note = `${noteObj.note.replaceAll("<br>", "").slice(0, 50)}`;
        return `Title: ${title}${noteObj.title.length > 50 ? "..." : ""}\nNote: ${note}${noteObj.note.length > 50 ? "..." : ""}`;
    };

    const scrollToNote = (e) => {
        setNoteToScrollTo(+e.target.dataset.id);
    };

    return (
        <div className={`all-entries__browser ${notesMatchSearch === 0 ? "browser-hidden" : ""}`}>
            {notes &&
                notes.length > 0 &&
                notes.map((noteObj) => (
                    <EntriesMiniature
                        key={noteObj.id}
                        title={getTitleAttr(noteObj)}
                        note={noteObj.note}
                        keywords={noteObj.keywords}
                        id={noteObj.id}
                        name={noteObj.title}
                        onClick={scrollToNote}
                    />
                ))}
        </div>
    );
};

export default EntriesBrowser;
