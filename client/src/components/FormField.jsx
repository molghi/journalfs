import { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";

const FormField = ({ fieldType, type, value, valueSetter }) => {
    const [labelMoved, setLabelMoved] = useState(type === "date" ? true : false); // is label moved up or not?   date label is pre-filled so it is moved up by default

    useEffect(() => {
        // If input value changes and is not '', its label moves up and stays there
        if (value !== "") setLabelMoved(true);
        else setLabelMoved(false);
    }, [value]);

    // What to return
    let element = "";

    // Define 'tabIndex' value for inputs
    let tabIndexNum;
    switch (type) {
        case "date":
            tabIndexNum = 1;
            break;
        case "keywords":
            tabIndexNum = 2;
            break;
        case "title":
            tabIndexNum = 3;
            break;
        case "note":
            tabIndexNum = 4;
            break;
        default:
            break;
    }

    // Capitalise first letter
    const capitalise = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

    // Get label element
    const labelEl = (
        <label className={`journal__form-input-label ${labelMoved ? "moved-up" : ""}`}>
            {capitalise(type)}
            {type === "keywords" && labelMoved && ": if more than one, separate by commas"}
        </label>
    );

    // It can be either input or textarea
    if (fieldType === "input") {
        element = (
            <>
                <input
                    tabIndex={tabIndexNum}
                    type="text"
                    className="journal__form-input"
                    id={`form-input-${type}`}
                    autoComplete="off"
                    value={value}
                    onChange={valueSetter}
                    required={type === "keywords" || type === "title" ? false : true}
                    title={
                        type === "date"
                            ? `Today is ${formatDate(new Date())}`
                            : type === "keywords"
                            ? "If more than one, separate by commas"
                            : ""
                    }
                />
                {labelEl}
            </>
        );
    } else {
        element = (
            <>
                <textarea
                    tabIndex={tabIndexNum}
                    name="note-body"
                    className="journal__form-input journal__form-textarea"
                    id="form-input-content"
                    title="Note body cannot be empty"
                    value={value}
                    onChange={valueSetter}
                ></textarea>
                {labelEl}
            </>
        );
    }

    return element;
};

export default FormField;
