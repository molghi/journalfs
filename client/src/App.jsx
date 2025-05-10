import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import BottomActions from "./components/BottomActions";
import Search from "./components/Search";
import AllEntries from "./components/AllEntries";

function App() {
    const [activeTab, setActiveTab] = useState(0); // 0 for Add New, 1 for View All
    const [errorMsg, setErrorMsg] = useState("");
    const [interfaceColor, setInterfaceColor] = useState("green");

    return (
        <>
            <div className="container">
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === 0 && <Form setErrorMsg={setErrorMsg} />}

                {activeTab === 1 && (
                    <>
                        <Search />
                        <AllEntries />
                    </>
                )}

                {errorMsg && <div>Error: {errorMsg}</div>}

                <BottomActions interfaceColor={interfaceColor} setInterfaceColor={setInterfaceColor} />
            </div>
        </>
    );
}

export default App;
