import { useEffect, useContext } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import BottomActions from "./components/BottomActions";
import Search from "./components/Search";
import AllEntries from "./components/AllEntries";
// import axios from "axios";
import testData from "./test-data.json";
import MyContext from "./context/MyContext";

function App() {
    const { notes, setNotes, activeTab, errorMsg } = useContext(MyContext);

    console.log(notes);

    useEffect(() => {
        if (activeTab === 1) setNotes(testData.slice(0, 5)); // 🔴 Remove slice here
        // const getAllNotes = async () => {
        //     try {
        //         const response = await axios.get("/test-data.json");
        //         console.log(response);
        //     } catch (error) {
        //         console.error(`Error getting notes:`, error);
        //     }
        // };
        // getAllNotes();
    }, [activeTab]);

    return (
        <>
            <div className="container">
                <Header />

                {activeTab === 0 && <Form />}

                {activeTab === 1 && (
                    <>
                        {notes && notes.length > 1 && <Search />}
                        <AllEntries />
                    </>
                )}

                {errorMsg && (
                    <div
                        style={{
                            border: "1px solid red",
                            color: "red",
                            padding: "15px",
                            backgroundColor: "black",
                            position: "fixed",
                            bottom: "15px",
                        }}
                    >
                        Error: {errorMsg}
                    </div>
                )}

                <BottomActions />
            </div>
        </>
    );
}

export default App;
