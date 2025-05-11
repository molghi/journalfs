import "./styles/AllEntries.scss";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import EntriesBrowser from "./EntriesBrowser";
import EntriesNotes from "./EntriesNotes";
import filterNotes from "../utils/filterNotes";

const AllEntries = () => {
    const { notes, searchTerm, isSearching } = useContext(MyContext);
    let notesMatchSearch;
    if (isSearching) notesMatchSearch = filterNotes(notes, searchTerm); // how many notes match the search term

    return (
        <>
            {notesMatchSearch === 0 && <div>Nothing was found</div>}

            <div className="all-entries__box">
                {notes && notes.length > 0 ? (
                    <>
                        <EntriesBrowser notesMatchSearch={notesMatchSearch} />
                        <EntriesNotes />
                    </>
                ) : (
                    "Nothing here yet..."
                )}
            </div>
        </>
    );
};

export default AllEntries;
