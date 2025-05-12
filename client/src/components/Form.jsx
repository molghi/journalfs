import "./styles/Form.scss";
import { useState } from "react";
import formatDate from "../utils/formatDate"; // function
import FormField from "./FormField"; // component
import { useContext } from "react";
import MyContext from "../context/MyContext";
import axios from "axios";

const Form = () => {
    const { setErrorMsg, baseUrl } = useContext(MyContext);
    const [date, setDate] = useState(formatDate(new Date()));
    const [keywords, setKeywords] = useState("");
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    const submitForm = async (e) => {
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
        // title input can be empty, in this case title will be 'Journal Entry'
        // note can have all sorts of characters
        setErrorMsg("");
        console.log(`Form submit with:`, date, keywords, title, note);
        const response = await axios.post(`${baseUrl}/notes`, { date, keywords, title, note });
        console.log(`submitForm response...`);
        console.log(response);
    };

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
