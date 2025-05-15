import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import "./styles/Search.scss";

const Search = () => {
    const { searchTerm, setSearchTerm, notes, setIsSearching, setIsFiltering, filterKeyword, setFilterKeyword } =
        useContext(MyContext);

    const submitSearchForm = (e) => {
        // On submitting search form
        e.preventDefault();
        setIsSearching(true);
    };

    useEffect(() => {
        // If search term is '', there is no searching or filtering, all is brought back
        if (searchTerm === "") {
            setIsSearching(false);
            setIsFiltering(false);
            setFilterKeyword("");
        }
    }, [searchTerm]);

    useEffect(() => {
        // If filter keyword exists, it must be shown in the input
        if (filterKeyword !== "") setSearchTerm(`keyword:${filterKeyword}`);
    }, [filterKeyword]);

    return (
        <div className="search">
            <form onSubmit={submitSearchForm} className="search__form">
                <input
                    type="text"
                    className="search__input"
                    placeholder={`Search among ${notes.length} notes...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Search;
