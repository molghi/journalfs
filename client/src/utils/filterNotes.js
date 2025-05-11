function filterNotes(notes, searchTerm) {
    return notes.filter((noteObj) => {
        const titleHasSearchTerm = noteObj.title.toLowerCase().includes(searchTerm.toLowerCase());
        const noteHasSearchTerm = noteObj.note.toLowerCase().includes(searchTerm.toLowerCase());
        const keywordsHaveSearchTerm =
            typeof noteObj.keywords === "string"
                ? noteObj.keywords.toLowerCase().includes(searchTerm.toLowerCase())
                : noteObj.keywords.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSearchTerm = [titleHasSearchTerm, noteHasSearchTerm, keywordsHaveSearchTerm].some((x) => x === true);

        if (matchesSearchTerm) return noteObj;
    }).length;
}

export default filterNotes;
