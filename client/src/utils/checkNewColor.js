function checkNewColor(newColor) {
    // mimicking DOM addition to get the computed color
    const span = document.createElement("span");
    document.body.appendChild(span);
    span.style.color = newColor;
    let color = window.getComputedStyle(span).color;
    document.body.removeChild(span);

    const rgbValues = color
        .slice(4, -1)
        .split(",")
        .map((x) => +x.trim()); // just the rgb values (r,g,b)

    if (rgbValues[0] < 40 && rgbValues[1] < 40 && rgbValues[2] < 40) return `rgb(0, 128, 0)`; // return green if it is too dark

    return color;
}

export default checkNewColor;
