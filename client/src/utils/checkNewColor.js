function checkNewColor(newColor) {
    // Mimick DOM addition to get the computed color
    const span = document.createElement("span");
    document.body.appendChild(span);
    span.style.color = newColor;
    let color = window.getComputedStyle(span).color;
    document.body.removeChild(span);

    // Get just the rgb values (r,g,b)
    const rgbValues = color
        .slice(4, -1)
        .split(",")
        .map((x) => +x.trim());

    // Return green (browser default) if it is too dark
    if (rgbValues[0] < 40 && rgbValues[1] < 40 && rgbValues[2] < 40) return `rgb(0, 128, 0)`;

    return color;
}

export default checkNewColor;
