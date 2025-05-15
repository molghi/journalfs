import "./styles/Form.scss";
import { useState, useContext } from "react";
import formatDate from "../utils/formatDate"; // function
import FormField from "./FormField"; // component
import MyContext from "../context/MyContext";
import axios from "axios";
import { saveNotesToLS } from "../utils/localStorageFunctions";

const Form = () => {
    const { setErrorMsg, baseUrl, setNotes, localStorageKey, notes, localStorageIDKey, setNotificationMsg } =
        useContext(MyContext);
    const [date, setDate] = useState(formatDate(new Date()));
    const [keywords, setKeywords] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    // =================================================================================

    const submitForm = async (e) => {
        try {
            e.preventDefault();

            // Some front-end validation
            if (!/^(0?[1-9]|[12][0-9]|3[01])[/.](0?[1-9]|1[0-2])[/.](10|[1-9][0-9])$/.test(date)) {
                return setErrorMsg("Incorrect date format. Correct: 28/12/25 or 28.12.25 (day, month, year)"); // validate date input
            }
            if (!/^[a-zA-Z0-9\-.,\s]*$/.test(keywords)) {
                return setErrorMsg(
                    "Keywords must contain only the specified characters: alphanumerics, hyphens, dots, commas, and whitespace." // validate keywords input
                );
            }
            // Title input can be empty, in this case title will be 'Journal Entry'
            // Note can have all sorts of characters
            setErrorMsg("");

            // Send a request to create a new note
            const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
            const response = await axios.post(`${baseUrl}/notes`, {
                date,
                keywords,
                title: title || "Journal Entry",
                note,
                userIdentifier: userIdentifierInLS,
            });

            // If returns successful, update state
            if (response.status === 200) {
                setNotes((prev) => [...prev, response.data.message]);
                saveNotesToLS(localStorageKey, notes);
                setDate(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear().toString().slice(-2)}`);
                setKeywords("");
                setTitle("");
                setNote("");
                setNotificationMsg("Note submitted!");
                console.log(`Add one: Response 200 ✅. Saved to LS. Fields emptied.`);
            } else {
                setErrorMsg("Note creation failed");
            }
        } catch (error) {
            console.error(`💥 Error adding note:`, error);
        }
    };

    // =================================================================================

    return (
        <div className="journal__form-box">
            <form onSubmit={submitForm} className="journal__form">
                <div className="journal__form-row">
                    {/* DATE FIELD */}
                    <div className="journal__form-input-box">
                        <FormField fieldType="input" type="date" value={date} valueSetter={(e) => setDate(e.target.value)} />
                    </div>
                    {/* KEYWORDS FIELD */}
                    <div className="journal__form-input-box">
                        <FormField
                            fieldType="input"
                            type="keywords"
                            value={keywords}
                            valueSetter={(e) => setKeywords(e.target.value)}
                        />
                    </div>
                </div>
                <div className="journal__form-row">
                    {/* TITLE FIELD */}
                    <div className="journal__form-input-box">
                        <FormField fieldType="input" type="title" value={title} valueSetter={(e) => setTitle(e.target.value)} />
                    </div>
                </div>
                <div className="journal__form-row">
                    {/* NOTE FIELD */}
                    <div className="journal__form-input-box">
                        <FormField fieldType="textarea" type="note" value={note} valueSetter={(e) => setNote(e.target.value)} />
                    </div>
                </div>
                <div className="journal__form-row">
                    <div className="journal__form-btns">
                        <button className="journal__form-btn" type="submit" title="Or press Command/Control + Enter">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
