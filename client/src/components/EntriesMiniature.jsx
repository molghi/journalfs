import { useContext } from "react";
import MyContext from "../context/MyContext";

const EntriesMiniature = ({ title, note, keywords, id, name, onClick }) => {
    const { searchTerm, isSearching, isFiltering, filterKeyword } = useContext(MyContext);

    // Define show it or not

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

    return (
        viewFlag && (
            <div className="all-entries__miniature" title={title} data-id={id} onClick={onClick}>
                {name}
            </div>
        )
    );
};

export default EntriesMiniature;
