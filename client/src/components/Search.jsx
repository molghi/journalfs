import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import "./styles/Search.scss";

const Search = () => {
    const { searchTerm, setSearchTerm, notes, setIsSearching, setIsFiltering, filterKeyword, setFilterKeyword } =
        useContext(MyContext);

    const submitSearchForm = (e) => {
        e.preventDefault();
        console.log(`submitSearchForm`);
        setIsSearching(true);
    };

    useEffect(() => {
        if (searchTerm === "") {
            setIsSearching(false);
            setIsFiltering(false);
            setFilterKeyword("");
        }
    }, [searchTerm]);

    useEffect(() => {
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

// .search   style="display: block; transition: opacity 0.3s ease 0s; opacity: 1;"
