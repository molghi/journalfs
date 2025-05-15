import { createContext, useState } from "react";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]); // main app data
    const [activeTab, setActiveTab] = useState(1); // 0 for Add New, 1 for View All
    const [errorMsg, setErrorMsg] = useState(""); // error msg
    const [notificationMsg, setNotificationMsg] = useState(""); // notification msg
    const [interfaceColor, setInterfaceColor] = useState("green"); // interface color
    const [searchTerm, setSearchTerm] = useState(""); // search term
    const [isSearching, setIsSearching] = useState(false); // search state on or off
    const [isFiltering, setIsFiltering] = useState(false); // filter state on or off
    const [noteToScrollTo, setNoteToScrollTo] = useState(""); // note to scroll to
    const [filterKeyword, setFilterKeyword] = useState(""); // keyword to filter by
    const [isLoading, setIsLoading] = useState(false); // loading is on or off

    // const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const localStorageKey = "journal_db"; // for 'notes'
    const localStorageIDKey = "journal_identity"; // where userIdentifier is

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
                isLoading,
                setIsLoading,
                localStorageKey,
                localStorageIDKey,
                baseUrl,
                notificationMsg,
                setNotificationMsg,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export { ContextProvider };
export default MyContext;
