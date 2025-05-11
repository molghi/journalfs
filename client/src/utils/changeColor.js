import checkNewColor from "../utils/checkNewColor";

function changeColor(setInterfaceColor) {
    let newColor = prompt("Type your new interface color:");

    if (newColor && newColor.length > 0) newColor = newColor.trim();

    if (!newColor) return;
    if (newColor && newColor.trim().length < 3) return;

    const checkedColor = checkNewColor(newColor);

    setInterfaceColor(checkedColor);
    localStorage.setItem("journalAccentColor", checkedColor);

    console.log(`UI color now:`, checkedColor);
}

export default changeColor;
