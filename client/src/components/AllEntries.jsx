import "./styles/AllEntries.scss";
import EntriesBrowser from "./EntriesBrowser";
import EntriesNotes from "./EntriesNotes";

const AllEntries = () => {
    return (
        <div className="all-entries__box">
            <EntriesBrowser />
            <EntriesNotes />
        </div>
    );
};

export default AllEntries;
