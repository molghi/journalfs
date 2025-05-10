import "./styles/BottomActions.scss";
import { useState, useEffect, useRef } from "react";
import formatDate from "../utils/formatDate";
import checkNewColor from "../utils/checkNewColor";

const BottomActions = ({ interfaceColor, setInterfaceColor }) => {
    const [nowTime, setNowTime] = useState(new Date());
    const timer = useRef();

    useEffect(() => {
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

    const handleAction = (e) => {
        console.log(e.target.textContent);
        if (e.target.textContent === "Change color") {
            let newColor = prompt("Type your new interface color:");
            if (newColor && newColor.length > 0) newColor = newColor.trim();
            if (!newColor) return;
            if (newColor && newColor.trim().length < 3) return;
            const checkedColor = checkNewColor(newColor);
            setInterfaceColor(checkedColor);
            localStorage.setItem("journalAccentColor", checkedColor);
            console.log(`UI color now:`, checkedColor);
        }
    };

    return (
        <div className="bottom-block">
            <div className="actions">
                {/* ICON BTN */}
                <div className="actions-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                    </svg>
                </div>

                {/* ACTIONS */}
                <div className="actions-menu">
                    <div
                        onClick={handleAction}
                        className="actions-action actions-action--color"
                        title="Change the accent color of the interface"
                    >
                        Change color
                    </div>
                    <div onClick={handleAction} className="actions-action actions-action--export" title="Export as JSON or TXT">
                        Export notes
                    </div>
                    <div onClick={handleAction} className="actions-action actions-action--import" title="Import as JSON">
                        Import notes
                    </div>
                    <input className="importer" type="file" />
                </div>
            </div>

            {/* DATE-TIME */}
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
