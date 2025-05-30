import "./styles/AllEntries.scss";
import { useContext, useEffect, useState } from "react";
import MyContext from "../context/MyContext";
import EntriesBrowser from "./EntriesBrowser";
import EntriesNotes from "./EntriesNotes";
import filterNotes from "../utils/filterNotes";

const AllEntries = () => {
    const { notes, searchTerm, isSearching } = useContext(MyContext);
    let notesMatchSearch;
    if (isSearching) notesMatchSearch = filterNotes(notes, searchTerm); // Get how many notes match the search term

    const [_, setComponentRefresh] = useState(1); // To refresh when 'notes' is updated
    useEffect(() => {
        setComponentRefresh((prev) => prev + 1);
    }, [notes]);

    return (
        <>
            {/* SHOW MESSAGE IF SEARCH RETURNED NOTHING */}
            {notesMatchSearch === 0 && <div>Nothing was found</div>}

            {/* EITHER GET ALL NOTES OR A MESSAGE */}
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
