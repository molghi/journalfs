import { useEffect, useContext } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import BottomActions from "./components/BottomActions";
import Search from "./components/Search";
import AllEntries from "./components/AllEntries";
import MyContext from "./context/MyContext";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import getAllNotes from "./utils/getAllNotes";
// import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";

function App() {
    const {
        notes,
        setNotes,
        activeTab,
        errorMsg,
        setErrorMsg,
        setIsLoading,
        baseUrl,
        localStorageKey,
        localStorageIDKey,
        notificationMsg,
        setNotificationMsg,
    } = useContext(MyContext);

    useEffect(() => {
        if (activeTab === 0) return;
        // Get all notes from db if on 'View All'
        getAllNotes(setIsLoading, localStorageIDKey, localStorageKey, baseUrl, setNotes);
    }, [activeTab]);

    useEffect(() => {
        // Hide error/notification msg after some time
        if (errorMsg) {
            const timer = setTimeout(() => setErrorMsg(""), 10000); // after 10 secs
            return () => clearTimeout(timer);
        }
        if (notificationMsg) {
            const timer = setTimeout(() => setNotificationMsg(""), 5000); // after 5 secs
            return () => clearTimeout(timer);
        }
    }, [errorMsg, notificationMsg]);

    useEffect(() => {
        // Create some user identifier to whom notes will belong
        const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
        console.log(`User Identifier in LS: ${userIdentifierInLS ? "exists" : "none"}`);
        if (userIdentifierInLS) return; // if exists, do not generate again
        localStorage.setItem(localStorageIDKey, uuidv4());
    }, []);

    return (
        <>
            <div className="container">
                <Header />

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1] }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: {
                            duration: 1,
                            times: [0, 0.5, 1],
                        },
                    }}
                >
                    {activeTab === 0 ? (
                        <Form />
                    ) : (
                        <>
                            {notes && notes.length > 1 && <Search />}
                            <AllEntries />
                        </>
                    )}
                </motion.div>

                {errorMsg && <div className="message error">Error: {errorMsg}</div>}

                {notificationMsg && <div className="message success">{notificationMsg}</div>}

                <BottomActions />
            </div>
        </>
    );
}

export default App;
