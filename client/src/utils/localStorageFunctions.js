function saveNotesToLS(localStorageKey, notes) {
    const stringified = JSON.stringify(notes);
    localStorage.setItem(localStorageKey, stringified);
}

// ================================================================================================

function getNotesFromLS(localStorageKey) {
    const from = localStorage.getItem(localStorageKey);
    if (from) {
        return JSON.parse(from);
    } else {
        console.log(`LS is empty.`);
        return [];
    }
}

// ================================================================================================

export { saveNotesToLS, getNotesFromLS };
