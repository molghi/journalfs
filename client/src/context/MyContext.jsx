import { createContext, useState } from "react";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [activeTab, setActiveTab] = useState(1); // 0 for Add New, 1 for View All
    const [errorMsg, setErrorMsg] = useState("");
    const [interfaceColor, setInterfaceColor] = useState("green");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [noteToScrollTo, setNoteToScrollTo] = useState("");
    const [filterKeyword, setFilterKeyword] = useState("");

    // const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <MyContext.Provider
            value={{
                notes,
                setNotes,
                activeTab,
                setActiveTab,
                errorMsg,
                setErrorMsg,
                interfaceColor,
                setInterfaceColor,
                searchTerm,
                setSearchTerm,
                isSearching,
                setIsSearching,
                noteToScrollTo,
                setNoteToScrollTo,
                filterKeyword,
                setFilterKeyword,
                isFiltering,
                setIsFiltering,
                baseUrl,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export { ContextProvider };
export default MyContext;
