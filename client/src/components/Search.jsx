import "./styles/Search.scss";

const Search = () => {
    return (
        <div className="search">
            {/* style="display: block; transition: opacity 0.3s ease 0s; opacity: 1;" */}
            <form action="#" className="search__form">
                <input type="text" className="search__input" placeholder="Search among 100 notes..." />
            </form>
        </div>
    );
};

export default Search;
