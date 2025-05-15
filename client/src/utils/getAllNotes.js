import axios from "axios";
import { saveNotesToLS } from "./localStorageFunctions";

// Get all notes belonging to 'userIdentifierInLS'
const getAllNotes = async (setIsLoading, localStorageIDKey, localStorageKey, baseUrl, setNotes) => {
    try {
        // Send network request
        setIsLoading(true);
        const userIdentifierInLS = localStorage.getItem(localStorageIDKey);
        const response = await axios.get(`${baseUrl}/notes/${userIdentifierInLS}`);
        setIsLoading(false);

        // If returns successful, update state and save to LS
        if (response.status === 200) {
            setNotes(response.data.message);
            saveNotesToLS(localStorageKey, response.data.message);
            console.log(`Read all: Response 200 ✅. Saved to LS.`);
        }
    } catch (error) {
        console.error(`💥 Error getting notes:`, error);
    }
};

export default getAllNotes;
