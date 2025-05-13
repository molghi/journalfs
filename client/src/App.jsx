import { useEffect, useContext } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import BottomActions from "./components/BottomActions";
import Search from "./components/Search";
import AllEntries from "./components/AllEntries";
import axios from "axios";
import testData from "./test-data.json";
import MyContext from "./context/MyContext";
import { motion, AnimatePresence } from "framer-motion";
import { saveNotesToLS } from "./utils/localStorageFunctions";
// import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";

function App() {
    const { notes, setNotes, activeTab, errorMsg, isLoading, setIsLoading, baseUrl, localStorageKey } = useContext(MyContext);

    console.log(notes);

    useEffect(() => {
        // if (activeTab === 1) setNotes(testData.slice(0, 5));

        // Get all notes from db
        const getAllNotes = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${baseUrl}/notes`);
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

    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //         <Route path="/" element={<MainLayout />}>
    //             <Route
    //                 path="/"
    //                 element={
    //                     // <AnimatePresence mode="wait">
    //                     //     <motion.div
    //                     //         key="form"
    //                     //         initial={{ opacity: 0 }}
    //                     //         animate={{ opacity: 1 }}
    //                     //         exit={{ opacity: 0 }}
    //                     //         transition={{ duration: 0.1 }}
    //                     //     >
    //                     <Form />
    //                     //     </motion.div>
    //                     // </AnimatePresence>
    //                 }
    //             />
    //             <Route
    //                 path="/view-all"
    //                 element={
    //                     // <AnimatePresence mode="wait">
    //                     //     <motion.div
    //                     //         key="view-all"
    //                     //         initial={{ opacity: 0 }}
    //                     //         animate={{ opacity: 1 }}
    //                     //         exit={{ opacity: 0 }}
    //                     //         transition={{ duration: 0.1 }}
    //                     //     >
    //                     <>
    //                         {notes && notes.length > 1 && <Search />}
    //                         <AllEntries />
    //                     </>
    //                     //     </motion.div>
    //                     // </AnimatePresence>
    //                 }
    //             />
    //         </Route>
    //     )
    // );

    // return <RouterProvider router={router} />;

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

                {errorMsg && <div className="error">Error: {errorMsg}</div>}

                <BottomActions />
            </div>
        </>
    );
}

export default App;

/* 

{activeTab === 0 && <Form />}

{activeTab === 1 && (
    <>
        {notes && notes.length > 1 && <Search />}
        <AllEntries />
    </>
)} 

*/
