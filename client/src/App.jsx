import { useEffect, useContext } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import BottomActions from "./components/BottomActions";
import Search from "./components/Search";
import AllEntries from "./components/AllEntries";
import MyContext from "./context/MyContext";
// import testData from "./test-data.json";
import { saveNotesToLS } from "./utils/localStorageFunctions";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
// import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";

function App() {
    const {
        notes,
        setNotes,
        activeTab,
        errorMsg,
        setErrorMsg,
        isLoading,
        setIsLoading,
        baseUrl,
        localStorageKey,
        localStorageIDKey,
        notificationMsg,
        setNotificationMsg,
    } = useContext(MyContext);

    // console.log(notes);

    useEffect(() => {
        if (activeTab === 0) return;
        // Get all notes from db
        const getAllNotes = async () => {
            try {
                setIsLoading(true);
                const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
                const response = await axios.get(`${baseUrl}/notes/${userIdentifierInLS}`);
                setIsLoading(false);
                if (response.status === 200) {
                    setNotes(response.data.message);
                    saveNotesToLS(localStorageKey, response.data.message);
                    console.log(`Read all: Response 200 ✅. Saved to LS.`);
                }
            } catch (error) {
                console.error(`💥 Error getting notes:`, error);
            }
        };
        getAllNotes();
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
        // Create some user identifier
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
