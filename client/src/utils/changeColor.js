import checkNewColor from "../utils/checkNewColor";

function changeColor(setInterfaceColor) {
    // Prompt
    let newColor = prompt("Type your new interface color:");

    // Check and trim
    if (newColor && newColor.length > 0) newColor = newColor.trim();

    // Check more
    if (!newColor) return;
    if (newColor && newColor.trim().length < 3) return;

    // Check if it's valid and not too dark
    const checkedColor = checkNewColor(newColor);

    // Update state and LS
    setInterfaceColor(checkedColor);
    localStorage.setItem("journalAccentColor", checkedColor);

    console.log(`UI color now:`, checkedColor);
}

export default changeColor;
