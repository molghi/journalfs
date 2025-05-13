import "./styles/BottomActions.scss";
import { useState, useEffect, useRef, useContext } from "react";
import formatDate from "../utils/formatDate";
import changeColor from "../utils/changeColor";
import exportNotes from "../utils/exportNotes";
import { importNotes, processInput } from "../utils/importNotes";
import MyContext from "../context/MyContext";

const BottomActions = () => {
    const { interfaceColor, setInterfaceColor, setErrorMsg, baseUrl, notes } = useContext(MyContext);

    const [nowTime, setNowTime] = useState(new Date());
    const timer = useRef();
    const fileUploadInput = useRef();

    useEffect(() => {
        // Start up timer, refresh every minute
        timer.current = setInterval(() => {
            setNowTime(new Date());
        }, 60 * 1000);
        return () => clearInterval(timer.current);
    }, []);

    useEffect(() => {
        // Check UI accent color
        const storedAccentColor = localStorage.getItem("journalAccentColor");
        if (!storedAccentColor) {
            const value = getComputedStyle(document.documentElement).getPropertyValue("--accent");
            localStorage.setItem("journalAccentColor", value); // if LS for it is null, set LS
        } else {
            document.documentElement.style.setProperty("--accent", storedAccentColor); // if LS isn't null, set the CSS var
        }
    }, [interfaceColor]);

    const handleActionClick = (e) => {
        if (e.target.textContent === "Change color") changeColor(setInterfaceColor); // Change the accent color of the interface
        if (e.target.textContent === "Export notes") exportNotes(baseUrl, notes); // Export as JSON or TXT
        if (e.target.textContent === "Import notes") importNotes(fileUploadInput); // Prompt and open the window to choose the file
    };

    const handleFileUpload = (e) => processInput(e, setErrorMsg); // Upon file upload

    return (
        <div className="bottom-block">
            <div className="actions">
                {/* ICON BTN */}
                <div className="actions-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                    </svg>
                </div>
                {/* ACTIONS MENU */}
                <div className="actions-menu">
                    <div
                        onClick={handleActionClick}
                        className="actions-action actions-action--color"
                        title="Change the accent color of the interface"
                    >
                        Change color
                    </div>
                    <div
                        onClick={handleActionClick}
                        className="actions-action actions-action--export"
                        title="Export as JSON or TXT"
                    >
                        Export notes
                    </div>
                    <div onClick={handleActionClick} className="actions-action actions-action--import" title="Import as JSON">
                        Import notes
                    </div>
                    <input className="importer" type="file" ref={fileUploadInput} onChange={handleFileUpload} />
                </div>
            </div>
            {/* DATE-TIME ELEMENT */}
            <div className="date-time">
                <div
                    className="time"
                    title={`Now: ${formatDate(nowTime)}  ̶ ${new Date(nowTime).getHours()}:${new Date(nowTime)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}
                >
                    {new Date(nowTime).getHours()}
                    <span>:</span>
                    {new Date(nowTime).getMinutes().toString().padStart(2, "0")}
                </div>
            </div>
        </div>
    );
};

export default BottomActions;
